import toast from "@/components/ui/toast";
import { baseURL } from "@/lib/constants";
import { ENDPOINTS } from "@/lib/endpoints";
import { axiosBaseQuery } from "@/services/api/api.service";
import axios from "axios";
import { useCallback, useState } from "react";
import { PresignedUrlResponse } from "../use-get-presigned-url";
import {
  FILE_CONTEXT_CONFIG,
  UploadToS3Result,
  UseUploadToS3Options,
} from "./use-upload-to-s3.types";

const useUploadToS3 = (options: UseUploadToS3Options): UploadToS3Result => {
  const { context, onSuccess, onError } = options;

  // Get config for this context, with optional overrides
  const contextConfig = FILE_CONTEXT_CONFIG[context];
  const allowedTypes = options.allowedTypes ?? contextConfig.allowedMimeTypes;
  const maxFileSize = options.maxFileSize ?? contextConfig.maxSizeBytes;

  const [isUploading, setIsUploading] = useState(false);
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const reset = useCallback(() => {
    setFileKey(null);
    setPreviewUrl(null);
    setIsUploading(false);
  }, []);

  const upload = useCallback(
    async (file: File): Promise<string | null> => {
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        const errorMessage = `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`;
        toast.error({ description: errorMessage });
        onError?.(new Error(errorMessage));
        return null;
      }

      // Validate file size
      if (file.size > maxFileSize) {
        const maxSizeMB = Math.round(maxFileSize / (1024 * 1024));
        const errorMessage = `File size must be less than ${maxSizeMB}MB`;
        toast.error({ description: errorMessage });
        onError?.(new Error(errorMessage));
        return null;
      }

      setIsUploading(true);

      // Create preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      try {
        // Step 1: Get presigned URL from API
        const presignedResponse = await axiosBaseQuery({
          url: `${baseURL}${ENDPOINTS.GET_PRESIGNED_URL({
            context,
            contentType: file.type,
            fileSize: file.size,
          })}`,
          method: "get",
        });

        const { uploadUrl, fileKey: key } = (
          presignedResponse.data as PresignedUrlResponse
        ).data;

        // Step 2: Upload file directly to S3 (no auth headers needed)
        await axios.put(uploadUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        setFileKey(key);
        onSuccess?.(key);

        return key;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to upload file";
        console.error("Failed to upload file:", err);
        toast.error({ description: errorMessage });
        onError?.(new Error(errorMessage));
        setPreviewUrl(null);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [context, allowedTypes, maxFileSize, onSuccess, onError],
  );

  return {
    upload,
    isUploading,
    fileKey,
    previewUrl,
    reset,
  };
};

export default useUploadToS3;
