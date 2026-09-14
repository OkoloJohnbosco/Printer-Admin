import toast from "@/components/ui/toast";
import { PresignedUrlContext } from "../use-get-presigned-url";
import useUploadToS3 from "../use-upload-to-s3";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  DELIVERABLE_MAX_FILES,
  FailedUploadRecord,
  UploadedFileRecord,
  UseMultiFileS3UploadOptions,
  UseMultiFileS3UploadResult,
} from "./use-multi-file-s3-upload.types";

interface UseMultiFileS3UploadHookOptions extends UseMultiFileS3UploadOptions {
  context: PresignedUrlContext;
}

const useMultiFileS3Upload = ({
  context,
  maxFiles = DELIVERABLE_MAX_FILES,
}: UseMultiFileS3UploadHookOptions): UseMultiFileS3UploadResult => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileRecord[]>([]);
  const [failedUploads, setFailedUploads] = useState<FailedUploadRecord[]>([]);
  const [uploadingFileName, setUploadingFileName] = useState<string | null>(
    null,
  );
  const isAddingFilesRef = useRef(false);

  const { upload, isUploading: isHookUploading } = useUploadToS3({
    context,
  });

  const isUploading = isHookUploading || uploadingFileName !== null;

  const fileCountLabel = useMemo(
    () => `${uploadedFiles.length} of ${maxFiles} files selected`,
    [uploadedFiles.length, maxFiles],
  );

  const canAddMore = uploadedFiles.length < maxFiles;

  const clearFiles = useCallback(() => {
    setUploadedFiles([]);
    setFailedUploads([]);
    setUploadingFileName(null);
    isAddingFilesRef.current = false;
  }, []);

  const removeFile = useCallback((key: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.key !== key));
  }, []);

  const getFileKeys = useCallback(
    () => uploadedFiles.map((file) => file.key),
    [uploadedFiles],
  );

  const addFiles = useCallback(
    async (fileList: FileList | File[]) => {
      if (isAddingFilesRef.current || isHookUploading) {
        return;
      }

      const incomingFiles = Array.from(fileList);
      if (incomingFiles.length === 0) {
        return;
      }

      isAddingFilesRef.current = true;

      try {
        let currentCount = uploadedFiles.length;
        const remainingSlots = maxFiles - currentCount;

        if (remainingSlots <= 0) {
          toast.error({
            description: `${maxFiles} files maximum. Remove a file to add another.`,
          });
          return;
        }

        const filesToUpload = incomingFiles.slice(0, remainingSlots);

        if (incomingFiles.length > remainingSlots) {
          toast.error({
            description: `Only ${remainingSlots} more file(s) can be added. Maximum is ${maxFiles}.`,
          });
        }

        for (const file of filesToUpload) {
          if (currentCount >= maxFiles) {
            break;
          }

          setUploadingFileName(file.name);

          const fileKey = await upload(file);
          if (fileKey) {
            setUploadedFiles((prev) => {
              if (prev.length >= maxFiles) {
                return prev;
              }

              if (prev.some((existing) => existing.key === fileKey)) {
                return prev;
              }

              return [...prev, { key: fileKey, name: file.name }];
            });
            currentCount += 1;
            setFailedUploads((prev) =>
              prev.filter((failed) => failed.name !== file.name),
            );
          } else {
            setFailedUploads((prev) => {
              if (prev.some((failed) => failed.name === file.name)) {
                return prev;
              }

              return [
                ...prev,
                {
                  name: file.name,
                  error: `Unable to upload ${file.name}`,
                },
              ];
            });
          }
        }
      } finally {
        setUploadingFileName(null);
        isAddingFilesRef.current = false;
      }
    },
    [isHookUploading, maxFiles, upload, uploadedFiles.length],
  );

  return {
    uploadedFiles,
    failedUploads,
    uploadingFileName,
    isUploading,
    maxFiles,
    fileCountLabel,
    canAddMore,
    addFiles,
    removeFile,
    clearFiles,
    getFileKeys,
  };
};

export default useMultiFileS3Upload;
