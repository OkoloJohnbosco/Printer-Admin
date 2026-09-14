export type ConfigValueType =
  | "number"
  | "array"
  | "object"
  | "string"
  | "boolean";

export interface DeliveryTier {
  maxKm: number | null;
  minKm: number;
  basePrice: number;
  pricePerKm: number;
}

export interface DesignPriceEntry {
  price: number;
  timeline: string;
}

export type ConfigCatalogValue =
  | number
  | string
  | boolean
  | DeliveryTier[]
  | Record<string, DesignPriceEntry>;

export interface ConfigCatalogItem {
  key: string;
  label: string;
  description: string;
  valueType: ConfigValueType;
  example: ConfigCatalogValue;
  configured: boolean;
  currentValue: ConfigCatalogValue;
}

export interface SystemConfigCatalogResponse {
  data: ConfigCatalogItem[];
  status: boolean;
}
