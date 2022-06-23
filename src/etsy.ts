import { EmailCredentials, sendEmail } from "./email.ts";
import { getEnvOrThrow } from "./env.ts";
import { EtsyApiConfig, EtsyListingState, EtsyUrlData } from "./etsy.model.ts";

const ETSY_URL_DATA: EtsyUrlData = {
  baseWebUrl: "https://www.etsy.com",
  baseApiUrl: "https://openapi.etsy.com/v2/",
  endPoints: {
    listing: "listing",
  },
};

export async function isEtsyItemInStock(id: string, etsyApiConfig: EtsyApiConfig): Promise<boolean> {
  const etsyListingUrl = `${etsyApiConfig.baseApiUrl}/listings/${id}?api_key=${etsyApiConfig.apiKey}`;
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
      `Item is in stock! <a href=${buildEtsyUrl(listingId)}>1 Gal. White Crock</a>`,
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

export function buildEtsyApiConfig(): Readonly<EtsyApiConfig> {
  return {
    baseApiUrl: ETSY_URL_DATA.baseApiUrl,
    apiKey: getEnvOrThrow("ETSY_API_KEY"),
  };
}

function buildEtsyUrl(listingId: string): string {
  return ETSY_URL_DATA.baseWebUrl + "/" + ETSY_URL_DATA.endPoints.listing + "/" + listingId;
}
