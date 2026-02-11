import { PresignedUrlContext } from "../use-get-presigned-url";

// File context configuration for each upload context
export interface FileContextConfig {
  maxSizeBytes: number;
  allowedMimeTypes: string[];
}

export const FILE_CONTEXT_CONFIG: Record<
  PresignedUrlContext,
  FileContextConfig
> = {
  AVATAR: {
    maxSizeBytes: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  OFFERING_IMAGE: {
    maxSizeBytes: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  FEATURED_IMAGE: {
    maxSizeBytes: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  HUB_DOCUMENT: {
    maxSizeBytes: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: ["image/jpeg", "image/png", "application/pdf"],
  },
  REFERENCE: {
    maxSizeBytes: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "image/vnd.adobe.photoshop",
      "application/x-coreldraw",
    ],
  },
  CART_DESIGN: {
    maxSizeBytes: 1024 * 1024 * 1024, // 1GB
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "image/vnd.adobe.photoshop",
      "application/x-coreldraw",
    ],
  },
  DELIVERABLE: {
    maxSizeBytes: 1024 * 1024 * 1024, // 1GB
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "image/vnd.adobe.photoshop",
      "application/x-coreldraw",
      "application/zip",
      "application/x-rar-compressed",
    ],
  },
};

export interface UseUploadToS3Options {
  context: PresignedUrlContext;
  /** Custom allowed MIME types. If not provided, uses context defaults. */
  allowedTypes?: string[];
  /** Custom max file size in bytes. If not provided, uses context defaults. */
  maxFileSize?: number;
  onSuccess?: (fileKey: string) => void;
  onError?: (error: Error) => void;
}

export interface UploadToS3Result {
  upload: (file: File) => Promise<string | null>;
  isUploading: boolean;
  fileKey: string | null;
  previewUrl: string | null;
  reset: () => void;
}
