import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";
import { app, get } from "https://denopkg.com/syumai/dinatra@master/mod.ts";
import { EtsyApiConfig, EtsyListingState } from "./etsy.model.ts";
import { setIntervalAtHour } from "./time.ts";

const GMAIL_PASSWORD = Deno.env.get("GMAIL_PASSWORD");
const GOBLIN_POTTERY_CROCK_LISTING_ID = "1177156178";

const etsyApiConfig: EtsyApiConfig = {
  baseUrl: "https://openapi.etsy.com/v2/",
  apiKey: Deno.env.get("ETSY_API_KEY"),
};

console.log("Etsy Product Watcher started!");

setIntervalAtHour(6, () => checkStatusAndSendEmail(GOBLIN_POTTERY_CROCK_LISTING_ID, etsyApiConfig));

app(
  get("/", async () => (await isEtsyItemInStock(GOBLIN_POTTERY_CROCK_LISTING_ID, etsyApiConfig)).toString()),
);

async function isEtsyItemInStock(id: string, etsyApiConfig: EtsyApiConfig): Promise<boolean> {
  const etsyListingUrl = `${etsyApiConfig.baseUrl}/listings/${id}?api_key=${etsyApiConfig.apiKey}`;
  const response = await fetch(etsyListingUrl);
  const json = await response.json();
  return json.results[0].state === EtsyListingState.ACTIVE;
}

async function sendEmail(
  subject: string,
  html: string,
): Promise<void> {
  const client = new SmtpClient();

  await client.connectTLS({
    hostname: "smtp.gmail.com",
    port: 465,
    username: "etsy.product.watcher@gmail.com",
    password: GMAIL_PASSWORD,
  });

  await client.send({
    from: "etsy.product.watcher@gmail.com",
    to: "will.r.warner@gmail.com",
    subject,
    content: "",
    html,
  });
}

async function checkStatusAndSendEmail(listingId: string, etsyApiConfig: EtsyApiConfig) {
  if (await isEtsyItemInStock(listingId, etsyApiConfig)) {
    await sendEmail(
      "In Stock",
      `Item is in stock! <a href=${URL}>1 Gal. White Crock</a>`,
    );

    console.log("In stock");
    return "In stock";
  } else {
    await sendEmail(
      "Out of Stock :(",
      `Item is out of stock <a href=${URL}>1 Gal. White Crock</a>`,
    );

    console.log("Out of stock");
    return "Out of stock";
  }
}
