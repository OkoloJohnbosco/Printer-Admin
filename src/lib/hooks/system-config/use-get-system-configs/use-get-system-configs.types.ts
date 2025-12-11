interface DeliveryTier {
  maxKm: number | null;
  minKm: number;
  basePrice: number;
  pricePerKm: number;
}

interface ConfigItemBase {
  id: string;
  key: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ConfigItemWithTiers extends ConfigItemBase {
  value: DeliveryTier[];
}

interface ConfigItemWithNumber extends ConfigItemBase {
  value: number;
}

export type ConfigItem = ConfigItemWithTiers | ConfigItemWithNumber;

export interface SystemConfigResponse {
  data: ConfigItem[];
  status: boolean;
}
