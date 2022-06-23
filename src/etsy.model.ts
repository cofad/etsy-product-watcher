export interface EtsyApiConfig {
  readonly baseApiUrl: string;
  readonly apiKey: string;
}

export const enum EtsyListingState {
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
  readonly state: Readonly<EtsyListingState>;
}

export interface EtsyApiResponse<T> {
  readonly count: number;
  readonly results: Readonly<T[]>;
  readonly params: Readonly<{ [key: string]: string }>;
  readonly type: string;
}

export interface EtsyUrlData {
  readonly baseWebUrl: string;
  readonly baseApiUrl: string;
  readonly endPoints: Readonly<{
    [key: string]: string;
  }>;
}
