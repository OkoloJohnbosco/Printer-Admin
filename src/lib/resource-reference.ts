export const ORDER_REFERENCE_PREFIX = "ord_";
export const PAYOUT_REFERENCE_PREFIX = "pay_";
export const DESIGNER_REQUEST_REFERENCE_PREFIX = "dsn_";

export const isOrderReference = (value: string) =>
  value.startsWith(ORDER_REFERENCE_PREFIX);

export const isPayoutReference = (value: string) =>
  value.startsWith(PAYOUT_REFERENCE_PREFIX);

export const isDesignerRequestReference = (value: string) =>
  value.startsWith(DESIGNER_REQUEST_REFERENCE_PREFIX);

export const isResourceReference = (value: string) =>
  isOrderReference(value) ||
  isPayoutReference(value) ||
  isDesignerRequestReference(value);
