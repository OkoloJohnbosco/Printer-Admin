export const DELIVERABLE_MAX_FILES = 5;
export const REFERENCE_MAX_FILES = 5;

export interface UploadedFileRecord {
  key: string;
  name: string;
}

export interface FailedUploadRecord {
  name: string;
  error: string;
}

export interface UseMultiFileS3UploadOptions {
  maxFiles?: number;
}

export interface UseMultiFileS3UploadResult {
  uploadedFiles: UploadedFileRecord[];
  failedUploads: FailedUploadRecord[];
  uploadingFileName: string | null;
  isUploading: boolean;
  maxFiles: number;
  fileCountLabel: string;
  canAddMore: boolean;
  addFiles: (files: FileList | File[]) => Promise<void>;
  removeFile: (key: string) => void;
  clearFiles: () => void;
  getFileKeys: () => string[];
}
