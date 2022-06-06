export interface EtsyApiConfig {
  baseUrl: string;
  apiKey: string | undefined;
}

export enum EtsyListingState {
  ACTIVE = "active",
  REMOVED = "removed",
  SOLD_OUT = "sold_out",
  EXPIRED = "expired",
  ALCHEMY = "alchemy",
  EDIT = "edit",
  DRAFT = "draft",
  CREATE = "create",
  PRIVATE = "private",
  UNAVAILABLE = "unavailable",
}

export interface EtsyListing {
  state: EtsyListingState;
}

export interface EtsyApiResponse<T> {
  count: number;
  results: T[];
  params: { [key: string]: string };
  type: string;
}
