export interface GetAuditLogsParams {
  cursor?: string;
  actorId?: string;
  action?: AuditLogAction;
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export enum AuditLogAction {
  DOCUMENT_APPROVED = "DOCUMENT_APPROVED",
  DOCUMENT_REJECTED = "DOCUMENT_REJECTED",
  HUB_VERIFIED = "HUB_VERIFIED",
  ORDER_REASSIGNED = "ORDER_REASSIGNED",
  PAYOUT_APPROVED = "PAYOUT_APPROVED",
  PAYOUT_REJECTED = "PAYOUT_REJECTED",
  CATEGORY_CREATED = "CATEGORY_CREATED",
  CATEGORY_UPDATED = "CATEGORY_UPDATED",
  CATEGORY_DELETED = "CATEGORY_DELETED",
  PRODUCT_CREATED = "PRODUCT_CREATED",
  PRODUCT_UPDATED = "PRODUCT_UPDATED",
  PRODUCT_DELETED = "PRODUCT_DELETED",
  CONFIG_UPDATED = "CONFIG_UPDATED",
  CONFIG_DELETED = "CONFIG_DELETED",
}

export interface GetAuditLogsResponse {
  data: AuditLogsData;
  status: boolean;
}

export interface AuditLogsData {
  nextCursor: string | null;
  logs: AuditLog[];
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorType: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Metadata;
  createdAt: string;
  actor: Actor;
}

export interface Actor {
  email: string;
  lastName: string;
  firstName: string;
}
export interface Metadata {
  hubId: string;
  amount: number;
  orderId: string;
}
