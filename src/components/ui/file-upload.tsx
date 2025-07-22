import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { convertToKilobyte } from "@/lib/utils";
import { CloudUpload, FileDown, Trash2 } from "lucide-react";
import { ChangeEvent, DragEvent } from "react";
import { buttonVariants } from "./button";
import { useFormField } from "./form";

interface FileUploadProps {
  value?: File;
  onChange: (file?: File) => void;
  id: string;
  helperText?: string;
}

const DragNdrop = ({ value, onChange, id, helperText }: FileUploadProps) => {
  const { error } = useFormField();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      onChange(selectedFiles[0]);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      onChange(droppedFiles[0]);
    }
  };

  const handleRemoveFile = () => {
    onChange(undefined);
  };

  return (
    <section className="">
      <div
        data-error={!!error}
        className={`border-2 data-[error=true]:border-destructive/30 border-dashed rounded-md border-brand-file p-4 bg-white flex flex-col items-center justify-center relative ${
          value ? "border-pri-base" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        {value ? (
          <>
            <div className="flex items-center w-full gap-4">
              <div className="w-fit">
                <FileDown className="size-8" />
              </div>
              <div className="space-y-1 text-sm">
                <p className="font-[600] text-brand-label">{value?.name}</p>
                {/* <p className="font-[600] text-brand-label">{value?.type}</p> */}
                <p className="text-brand-text">
                  {convertToKilobyte(value?.size)}KB - 100% uploaded
                </p>
              </div>
              <div className="ml-auto">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="w-6 h-6 border border-brand-error-100 cursor-pointer grid place-items-center rounded-full text-white"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-brand-error-100" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete file</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="upload-info">
              <div className="w-fit mx-auto">
                <CloudUpload className="size-8" />
              </div>
            </div>
            <input
              type="file"
              hidden
              id={id}
              name={id}
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.doc,.pdf,.webp"
            />
            <div className="text-center text-sm text-brand-text space-y-1">
              <div>
                <span className="text-nm">
                  Drag and drop your {helperText} here, or
                </span>
              </div>
              <label
                htmlFor={id}
                className={buttonVariants({
                  className: "cursor-pointer",
                })}
              >
                Browse Files
              </label>
              <p className="text-brand-text text-[10px] pt-2 font-light text-center">
                Supported formats: PDF, JPG, PNG (Max size: 10MB)
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DragNdrop;
