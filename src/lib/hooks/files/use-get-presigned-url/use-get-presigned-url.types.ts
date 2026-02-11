export type PresignedUrlContext =
  | "AVATAR"
  | "REFERENCE"
  | "DELIVERABLE"
  | "CART_DESIGN"
  | "HUB_DOCUMENT"
  | "OFFERING_IMAGE"
  | "FEATURED_IMAGE";

export interface GetPresignedUrlParams {
  context: PresignedUrlContext;
  contentType: string;
  fileSize: number;
}

export interface PresignedUrlResponse {
  data: {
    fileKey: string;
    uploadUrl: string;
  };
  success: boolean;
}
