"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Download, FileImage, FileText, Image, Layers } from "lucide-react";
import { useState } from "react";

interface ReferenceFilesCardProps {
  references: string[];
  title?: string;
}

type FileType = "image" | "pdf" | "psd" | "cdr" | "unknown";

interface FileInfo {
  url: string;
  name: string;
  extension: string;
  type: FileType;
}

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "gif"];
const PDF_EXTENSIONS = ["pdf"];
const PSD_EXTENSIONS = ["psd"];
const CDR_EXTENSIONS = ["cdr"];

function getFileInfo(url: string): FileInfo {
  const urlParts = url.split("/");
  const fileName = urlParts[urlParts.length - 1];
  const extension = fileName.split(".").pop()?.toLowerCase() || "";

  let type: FileType = "unknown";
  if (IMAGE_EXTENSIONS.includes(extension)) {
    type = "image";
  } else if (PDF_EXTENSIONS.includes(extension)) {
    type = "pdf";
  } else if (PSD_EXTENSIONS.includes(extension)) {
    type = "psd";
  } else if (CDR_EXTENSIONS.includes(extension)) {
    type = "cdr";
  }

  return {
    url,
    name: fileName,
    extension,
    type,
  };
}

function getFileIcon(type: FileType) {
  switch (type) {
    case "image":
      return <Image className="h-8 w-8" />;
    case "pdf":
      return <FileText className="h-8 w-8" />;
    case "psd":
      return <Layers className="h-8 w-8" />;
    case "cdr":
      return <FileImage className="h-8 w-8" />;
    default:
      return <FileText className="h-8 w-8" />;
  }
}

function getFileTypeLabel(type: FileType, extension: string) {
  switch (type) {
    case "image":
      return extension.toUpperCase();
    case "pdf":
      return "PDF Document";
    case "psd":
      return "Photoshop File";
    case "cdr":
      return "CorelDRAW File";
    default:
      return extension.toUpperCase() || "File";
  }
}

function getFileTypeColor(type: FileType) {
  switch (type) {
    case "image":
      return "bg-blue-500/10 text-blue-500";
    case "pdf":
      return "bg-red-500/10 text-red-500";
    case "psd":
      return "bg-purple-500/10 text-purple-500";
    case "cdr":
      return "bg-green-500/10 text-green-500";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function FilePreview({ file }: { file: FileInfo }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(file.url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch {
      // Fallback: open in new tab if fetch fails (CORS)
      window.open(file.url, "_blank");
    }
  };

  if (file.type === "image" && !imageError) {
    return (
      <div
        className="group relative aspect-auto w-full min-w-0 overflow-hidden rounded-lg border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={file.url}
          alt={file.name}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          onError={() => setImageError(true)}
          width={100}
          height={100}
        />
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-200",
            "min-h-[44px] min-w-[44px] touch-manipulation",
            "opacity-100",
            isHovered ? "sm:opacity-100" : "sm:opacity-0",
          )}
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownload}
            className="min-h-[44px] min-w-[44px] shrink-0 touch-manipulation gap-2 sm:min-h-0 sm:min-w-0"
          >
            <Download className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
        <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/60 to-transparent p-2">
          <p className="truncate text-xs text-white" title={file.name}>
            {file.name}
          </p>
        </div>
      </div>
    );
  }

  // Non-image files or image load error
  return (
    <div
      className="border-border group hover:bg-muted/50 relative flex aspect-auto w-full min-w-0 flex-col items-center justify-center gap-2 rounded-lg border p-3 transition-colors sm:p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full",
          getFileTypeColor(file.type),
        )}
      >
        {getFileIcon(file.type)}
      </div>
      <div className="text-center">
        <p className="text-muted-foreground text-xs">
          {getFileTypeLabel(file.type, file.extension)}
        </p>
        <p
          className="mt-1 max-w-full truncate text-xs font-medium"
          title={file.name}
        >
          {file.name.length > 20
            ? `${file.name.slice(0, 10)}...${file.name.slice(-10)}`
            : file.name}
        </p>
      </div>
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 transition-opacity duration-200",
          "opacity-100",
          isHovered ? "sm:opacity-100" : "sm:opacity-0",
        )}
      >
        <Button
          variant="secondary"
          size="sm"
          onClick={handleDownload}
          className="min-h-[44px] min-w-[44px] shrink-0 touch-manipulation gap-2 sm:min-h-0 sm:min-w-0"
        >
          <Download className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Download</span>
        </Button>
      </div>
    </div>
  );
}

export default function ReferenceFilesCard({
  references,
  title = "Reference Files",
}: ReferenceFilesCardProps) {
  if (!references || references.length === 0) {
    return null;
  }

  const files = references.map(getFileInfo);

  const handleDownloadAll = async () => {
    for (const file of files) {
      try {
        const response = await fetch(file.url);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        // Small delay between downloads
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch {
        window.open(file.url, "_blank");
      }
    }
  };

  return (
    <Card className="@container/card w-full min-w-0 overflow-hidden shadow-none">
      <CardHeader className="space-y-2 px-4 py-0!">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="py-0! text-base sm:text-lg">{title}</CardTitle>
          {files.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadAll}
              className="h-9 shrink-0 touch-manipulation gap-2 sm:self-center"
            >
              <Download className="h-4 w-4 shrink-0" />
              <span className="truncate">Download All</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-4 py-0! sm:px-6">
        <div className="notification-grid grid gap-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="mx-auto w-full max-w-[200px] min-w-0 sm:mx-0 sm:max-w-none"
            >
              <FilePreview file={file} />
            </div>
          ))}
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          {files.length} file{files.length !== 1 ? "s" : ""} •{" "}
          {files.filter((f) => f.type === "image").length} image
          {files.filter((f) => f.type === "image").length !== 1 ? "s" : ""}
          {files.filter((f) => f.type !== "image").length > 0 &&
            ` • ${files.filter((f) => f.type !== "image").length} other`}
        </p>
      </CardContent>
    </Card>
  );
}
