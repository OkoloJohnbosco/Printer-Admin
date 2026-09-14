import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type {
  FailedUploadRecord,
  UploadedFileRecord,
} from "@/lib/hooks/files/use-multi-file-s3-upload/use-multi-file-s3-upload.types";
import {
  AlertCircle,
  AlertTriangle,
  FileUp,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";

interface MultiFileUploadFieldProps {
  label: string;
  description: string;
  accept: string;
  required?: boolean;
  uploadedFiles: UploadedFileRecord[];
  failedUploads: FailedUploadRecord[];
  uploadingFileName: string | null;
  isUploading: boolean;
  fileCountLabel: string;
  maxFiles: number;
  canAddMore: boolean;
  onFilesSelected: (files: FileList | File[]) => Promise<void>;
  onRemoveFile: (key: string) => void;
  showEmptyError?: boolean;
}

export function MultiFileUploadField({
  label,
  description,
  accept,
  required = false,
  uploadedFiles,
  failedUploads,
  uploadingFileName,
  isUploading,
  fileCountLabel,
  maxFiles,
  canAddMore,
  onFilesSelected,
  onRemoveFile,
  showEmptyError = false,
}: MultiFileUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileToRemove, setFileToRemove] = useState<UploadedFileRecord | null>(
    null,
  );

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    await onFilesSelected(files);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleConfirmRemove = () => {
    if (!fileToRemove) return;

    onRemoveFile(fileToRemove.key);
    setFileToRemove(null);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <p className="text-muted-foreground text-xs">{description}</p>
        <p className="text-muted-foreground text-xs">
          {fileCountLabel} • {maxFiles} files maximum
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={accept}
        className="hidden"
        multiple
        disabled={!canAddMore || isUploading}
      />

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => fileInputRef.current?.click()}
        disabled={!canAddMore || isUploading}
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {uploadingFileName
              ? `Uploading ${uploadingFileName}...`
              : "Uploading..."}
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Select Files
          </>
        )}
      </Button>

      {!canAddMore && (
        <p className="text-muted-foreground text-xs">
          Maximum of {maxFiles} files reached. Remove a file to add another.
        </p>
      )}

      {uploadedFiles.length > 0 && (
        <div className="border-border space-y-2 rounded-md border p-3">
          {uploadedFiles.map((file, index) => (
            <div
              key={file.key}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <FileUp className="text-muted-foreground h-4 w-4 shrink-0" />
                <div className="min-w-0">
                  <span className="block truncate text-sm">{file.name}</span>
                  {index === 0 && (
                    <span className="text-muted-foreground text-xs">
                      Primary file
                    </span>
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive h-7 w-7 shrink-0"
                onClick={() => setFileToRemove(file)}
                disabled={isUploading}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {failedUploads.length > 0 && (
        <div className="space-y-1">
          {failedUploads.map((failed) => (
            <p
              key={failed.name}
              className="text-destructive flex items-center gap-1 text-xs"
            >
              <AlertCircle className="h-3 w-3 shrink-0" />
              {failed.error}
            </p>
          ))}
        </div>
      )}

      {showEmptyError && uploadedFiles.length === 0 && !isUploading && (
        <p className="text-destructive flex items-center gap-1 text-xs">
          <AlertCircle className="h-3 w-3" />
          Please upload at least one file
        </p>
      )}

      <AlertDialog
        open={fileToRemove !== null}
        onOpenChange={(open) => {
          if (!open) {
            setFileToRemove(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="text-destructive h-5 w-5" />
              Remove Design File
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove{" "}
              <span className="font-semibold">{fileToRemove?.name}</span> from
              this upload? You will need to upload it again before submitting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmRemove}
            >
              Remove File
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
