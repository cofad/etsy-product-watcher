import { app, get } from "https://denopkg.com/syumai/dinatra@master/mod.ts";
import { buildEmailCredentials } from "./email.ts";
import { buildEtsyApiConfig, checkStatusAndSendEmail, isEtsyItemInStock } from "./etsy.ts";
import { setIntervalAtHour } from "./time.ts";

const GOBLIN_POTTERY_CROCK_LISTING_ID: Readonly<string> = "1177156178";

console.log("Etsy Product Watcher started!");

setIntervalAtHour(
  6,
  () => checkStatusAndSendEmail(buildEmailCredentials(), GOBLIN_POTTERY_CROCK_LISTING_ID, buildEtsyApiConfig()),
);

app(
  get("/", async () => (await isEtsyItemInStock(GOBLIN_POTTERY_CROCK_LISTING_ID, buildEtsyApiConfig())).toString()),
);
