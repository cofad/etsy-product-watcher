import { app, get } from "https://denopkg.com/syumai/dinatra@master/mod.ts";
import { checkStatusAndSendEmail, isEtsyItemInStock } from "./etsy.ts";
import { EtsyApiConfig } from "./etsy.model.ts";
import { setIntervalAtHour } from "./time.ts";
import { EmailCredentials } from "./email.ts";
import { getEnvOrThrow } from "./env.ts";

const CREDENTIALS: Readonly<EmailCredentials> = {
  email: "etsy.product.watcher@gmail.com",
  password: getEnvOrThrow("GMAIL_PASSWORD"),
};
const GOBLIN_POTTERY_CROCK_LISTING_ID: Readonly<string> = "1177156178";

const etsyApiConfig: Readonly<EtsyApiConfig> = {
  baseUrl: "https://openapi.etsy.com/v2/",
  apiKey: getEnvOrThrow("ETSY_API_KEY"),
};

console.log("Etsy Product Watcher started!");

setIntervalAtHour(6, () => checkStatusAndSendEmail(CREDENTIALS, GOBLIN_POTTERY_CROCK_LISTING_ID, etsyApiConfig));

app(
  get("/", async () => (await isEtsyItemInStock(GOBLIN_POTTERY_CROCK_LISTING_ID, etsyApiConfig)).toString()),
);
