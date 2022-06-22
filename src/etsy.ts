import { EmailCredentials, sendEmail } from "./email.ts";
import { EtsyApiConfig, EtsyListingState } from "./etsy.model.ts";

export async function isEtsyItemInStock(id: string, etsyApiConfig: EtsyApiConfig): Promise<boolean> {
  const etsyListingUrl = `${etsyApiConfig.baseUrl}/listings/${id}?api_key=${etsyApiConfig.apiKey}`;
  const response = await fetch(etsyListingUrl);
  const json = await response.json();
  const isEtsyItemInStock = json.results[0].state === EtsyListingState.ACTIVE;
  console.log("Is Etsy item in stock: " + isEtsyItemInStock);
  return isEtsyItemInStock;
}

export async function checkStatusAndSendEmail(
  credentials: EmailCredentials,
  listingId: string,
  etsyApiConfig: EtsyApiConfig,
) {
  if (await isEtsyItemInStock(listingId, etsyApiConfig)) {
    await sendEmail(
      credentials,
      "In Stock",
      `Item is in stock! <a href=${URL}>1 Gal. White Crock</a>`,
    );

    console.log("In stock");
    return "In stock";
  } else {
    await sendEmail(
      credentials,
      "Out of Stock :(",
      `Item is out of stock <a href=${URL}>1 Gal. White Crock</a>`,
    );

    console.log("Out of stock");
    return "Out of stock";
  }
}
