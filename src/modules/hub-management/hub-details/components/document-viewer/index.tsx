"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, FileIcon, FileText, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface Document {
  id: string;
  name: string;
  type: "image" | "pdf" | "doc";
  url: string;
  uploadedAt: string;
}

interface DocumentViewerProps {
  documents: Document[];
  onDocumentViewed: (documentId: string) => void;
  viewedDocuments: string[];
}

export default function DocumentViewer({
  documents,
  onDocumentViewed,
  viewedDocuments,
}: DocumentViewerProps) {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  );

  const getDocumentIcon = (type: Document["type"]) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5" />;
      case "pdf":
        return <FileText className="h-5 w-5" />;
      case "doc":
        return <FileIcon className="h-5 w-5" />;
      default:
        return <FileIcon className="h-5 w-5" />;
    }
  };

  const getDocumentTypeColor = (type: Document["type"]) => {
    switch (type) {
      case "image":
        return "bg-blue-100 text-blue-700";
      case "pdf":
        return "bg-red-100 text-red-700";
      case "doc":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    if (!viewedDocuments.includes(document.id)) {
      onDocumentViewed(document.id);
    }
  };

  const renderDocumentPreview = (document: Document) => {
    if (!selectedDocument) return null;

    switch (document.type) {
      case "image":
        return (
          <div className="flex justify-center">
            <Image
              src={document.url ?? ""}
              fill
              alt={document.name}
              className="max-h-[70vh] max-w-full rounded-lg object-contain"
            />
          </div>
        );
      case "pdf":
        return (
          <div className="h-[70vh] w-full">
            <iframe
              src={document.url}
              className="h-full w-full rounded-lg"
              title={document.name}
            />
          </div>
        );
      case "doc":
        return (
          <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
            <FileIcon className="text-muted-foreground h-16 w-16" />
            <p className="text-muted-foreground">
              Document preview not available. Click the download link below to
              view the document.
            </p>
            <Button asChild>
              <a href={document.url} target="_blank" rel="noopener noreferrer">
                Open Document
              </a>
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Verification Documents</h3>
          <Badge variant="outline">
            {viewedDocuments.length}/{documents.length} Viewed
          </Badge>
        </div>

        <div className="grid gap-3">
          {documents.map((document, index) => {
            const isViewed = viewedDocuments.includes(document.id);
            return (
              <Card
                key={document.id}
                className={`transition-colors ${isViewed ? "border-green-200 bg-green-50" : ""}`}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full p-2 ${getDocumentTypeColor(document.type)}`}
                    >
                      {getDocumentIcon(document.type)}
                    </div>
                    <div>
                      <p className="font-medium">Document {index + 1}</p>
                      <p className="text-muted-foreground text-sm">
                        {document.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Uploaded:{" "}
                        {new Date(document.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isViewed && (
                      <Badge className="bg-green-100 text-green-700">
                        Viewed
                      </Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDocument(document)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {viewedDocuments.length < documents.length && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-700">
              <strong>Note:</strong> You must view all {documents.length}{" "}
              documents before you can update the hub status.
            </p>
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      <AlertDialog
        open={!!selectedDocument}
        onOpenChange={() => setSelectedDocument(null)}
      >
        <AlertDialogContent className="max-h-[90vh] max-w-4xl overflow-auto sm:max-w-3xl">
          <AlertDialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <AlertDialogTitle>{selectedDocument?.name}</AlertDialogTitle>
                <AlertDialogDescription>
                  {selectedDocument?.type.toUpperCase()} Document
                </AlertDialogDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDocument(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </AlertDialogHeader>

          {selectedDocument && renderDocumentPreview(selectedDocument)}

          <AlertDialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedDocument(null)}
              className="flex-1"
            >
              Close
            </Button>
            <Button asChild className="flex-1">
              <a
                href={selectedDocument?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in New Tab
              </a>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
