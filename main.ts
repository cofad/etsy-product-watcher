import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.30-alpha/deno-dom-wasm.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

import { app, get } from "https://denopkg.com/syumai/dinatra/mod.ts";

const URL = "https://www.etsy.com/listing/1177156178";

console.log("Etsy Product Watcher started!");

app(
  get("/", () => "<h1>Hello From Deno on Fly!</h1>"),
);

setInterval(async () => {
  const goblinPotteryCrockHtmlString = await fetch(URL).then((response) =>
    response.text()
  );

  const parser = new DOMParser();
  const doc = parser.parseFromString(goblinPotteryCrockHtmlString, "text/html");

  const message = doc?.querySelector(".wt-text-body-01")?.innerText;

  if (message?.includes("Sorry")) {
    await sendEmail(
      "Out of Stock :(",
      `Item is out of stock <a href=${URL}>1 Gal. White Crock</a>`,
    );

    console.log("Item is out of stock!");
  } else {
    await sendEmail(
      "In Stock",
      `Item is in stock! <a href=${URL}>1 Gal. White Crock</a>`,
    );
  }
}, 1000 * 60 * 60);

async function sendEmail(
  subject: string,
  html: string,
): Promise<void> {
  const client = new SmtpClient();

  await client.connectTLS({
    hostname: "smtp.gmail.com",
    port: 465,
    username: "etsy.product.watcher@gmail.com",
    password: "ForWatchingEtsyProducts",
  });

  await client.send({
    from: "etsy.product.watcher@gmail.com",
    to: "will.r.warner@gmail.com",
    subject,
    content: "",
    html,
  });
}
