import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.30-alpha/deno-dom-wasm.ts";

const URL = "https://www.etsy.com/listing/1177156178";

setInterval(async () => {
  const goblinPotteryCrockHtmlString = await fetch(URL).then((response) =>
    response.text()
  );

  const parser = new DOMParser();
  const doc = parser.parseFromString(goblinPotteryCrockHtmlString, "text/html");

  const message = doc?.querySelector(".wt-text-body-01")?.innerText;

  if (message?.includes("Sorry")) {
    console.log("Item is out of stock!");
  } else {
    console.log("Item is in stock!");
  }
}, 1000 * 60 * 15);
