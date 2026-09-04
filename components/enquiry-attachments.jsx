"use client"

import { useState } from "react"
import { Download, Eye, File, FileImage, FileSpreadsheet, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif"])
const SPREADSHEET_EXTENSIONS = new Set(["xls", "xlsx"])
const DOCUMENT_EXTENSIONS = new Set(["doc", "docx"])

const getRawFileUrl = (attachment) =>
  attachment?.filePath || attachment?.FilePath || attachment?.fileUrl || attachment?.url || attachment?.attachment || ""

const getSafeFileUrl = (attachment) => {
  const rawUrl = getRawFileUrl(attachment)

  if (typeof rawUrl !== "string" || !rawUrl.trim()) return null

  const trimmedUrl = rawUrl.trim()
  if (trimmedUrl.toLowerCase() === "failed" || /\/EnquiryFiles\/Failed\/?(?:[?#].*)?$/i.test(trimmedUrl)) {
    return null
  }

  try {
    const parsedUrl = new URL(trimmedUrl)
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:" ? parsedUrl.href : null
  } catch {
    return null
  }
}

const getFileName = (attachment, index) => {
  const suppliedName = attachment?.fileName || attachment?.FileName || attachment?.name || attachment?.attachmentName
  if (typeof suppliedName === "string" && suppliedName.trim()) return suppliedName.trim()

  const safeUrl = getSafeFileUrl(attachment)
  if (safeUrl) {
    try {
      const pathName = new URL(safeUrl).pathname.split("/").filter(Boolean).pop()
      if (pathName) return decodeURIComponent(pathName)
    } catch {
      // The URL has already been validated, but keep the fallback defensive.
    }
  }

  return `Attachment ${index + 1}`
}

const getExtension = (attachment, fileName) => {
  const explicitExtension = attachment?.fileExtension || attachment?.FileExtension
  if (typeof explicitExtension === "string" && explicitExtension.trim()) {
    return explicitExtension.replace(/^\./, "").toLowerCase()
  }

  const nameWithoutQuery = fileName.split(/[?#]/)[0]
  const extension = nameWithoutQuery.includes(".") ? nameWithoutQuery.split(".").pop() : ""
  return extension?.toLowerCase() || ""
}

const getFileKind = (attachment, extension) => {
  const suppliedType = String(
    attachment?.fileType || attachment?.FileType || attachment?.attachmentType || attachment?.contentType || ""
  ).toLowerCase()

  if (suppliedType === "image" || suppliedType.startsWith("image/") || IMAGE_EXTENSIONS.has(extension)) return "image"
  if (suppliedType.includes("pdf") || extension === "pdf") return "pdf"
  if (suppliedType.includes("spreadsheet") || suppliedType.includes("excel") || SPREADSHEET_EXTENSIONS.has(extension)) {
    return "spreadsheet"
  }
  if (suppliedType.includes("word") || suppliedType.includes("document") || DOCUMENT_EXTENSIONS.has(extension)) {
    return "document"
  }

  return "file"
}

const getFileSize = (attachment) => {
  const suppliedSize = attachment?.fileSize ?? attachment?.FileSize ?? attachment?.size ?? attachment?.fileLength
  if (suppliedSize === null || suppliedSize === undefined || suppliedSize === "") return null
  if (typeof suppliedSize === "string") return suppliedSize
  if (!Number.isFinite(suppliedSize) || suppliedSize < 0) return null

  if (suppliedSize < 1024) return `${suppliedSize} B`
  if (suppliedSize < 1024 * 1024) return `${(suppliedSize / 1024).toFixed(1)} KB`
  return `${(suppliedSize / (1024 * 1024)).toFixed(1)} MB`
}

const getFileDetails = (attachment, index) => {
  const name = getFileName(attachment, index)
  const extension = getExtension(attachment, name)
  const kind = getFileKind(attachment, extension)

  return {
    attachment,
    extension,
    kind,
    name,
    size: getFileSize(attachment),
    typeLabel: extension ? extension.toUpperCase() : kind === "file" ? "File" : kind[0].toUpperCase() + kind.slice(1),
    url: getSafeFileUrl(attachment),
  }
}

const FileTypeIcon = ({ kind }) => {
  const iconClass = "h-8 w-8 text-[#B80D2D]"

  if (kind === "image") return <FileImage className={iconClass} aria-hidden="true" />
  if (kind === "spreadsheet") return <FileSpreadsheet className={iconClass} aria-hidden="true" />
  if (kind === "pdf" || kind === "document") return <FileText className={iconClass} aria-hidden="true" />
  return <File className={iconClass} aria-hidden="true" />
}

const DownloadButton = ({ file, className = "" }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState("")

  const handleDownload = async () => {
    if (!file.url || isDownloading) return

    setIsDownloading(true)
    setDownloadError("")

    try {
      const response = await fetch(file.url, { mode: "cors" })
      if (!response.ok) throw new Error(`Download failed with status ${response.status}`)

      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      const downloadLink = document.createElement("a")
      downloadLink.href = objectUrl
      downloadLink.download = file.name
      document.body.appendChild(downloadLink)
      downloadLink.click()
      downloadLink.remove()
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
    } catch (error) {
      console.error("Attachment download failed:", error)
      setDownloadError("Download blocked by the file server. Please contact support.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className={className}>
      <Button type="button" variant="outline" size="sm" onClick={handleDownload} disabled={isDownloading}>
        {isDownloading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Download className="h-4 w-4" aria-hidden="true" />
        )}
        {isDownloading ? "Downloading..." : "Download"}
      </Button>
      {downloadError && <p className="mt-2 text-xs text-red-600" role="alert">{downloadError}</p>}
    </div>
  )
}

const AttachmentCard = ({ file, onPreview }) => {
  return (
    <article className={`rounded-lg border p-4 ${file.url ? "bg-white" : "bg-gray-50"}`}>
      <div className="flex min-w-0 items-start gap-3">
        <div className="rounded-lg bg-red-50 p-2">
          <FileTypeIcon kind={file.kind} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-900" title={file.name}>
            {file.name}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {file.typeLabel}{file.size ? ` · ${file.size}` : ""}
          </p>
        </div>
      </div>

      {!file.url ? (
        <p className="mt-4 text-sm font-medium text-gray-500">Attachment unavailable</p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {file.kind === "image" && (
            <Button type="button" variant="outline" size="sm" onClick={() => onPreview(file)}>
              <Eye className="h-4 w-4" aria-hidden="true" />
              Preview
            </Button>
          )}

          {file.kind === "pdf" && (
            <Button asChild variant="outline" size="sm">
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                <Eye className="h-4 w-4" aria-hidden="true" />
                Preview
              </a>
            </Button>
          )}

          <DownloadButton file={file} />
        </div>
      )}
    </article>
  )
}

export default function EnquiryAttachments({ attachments = [], emptyMessage = "No attachments available" }) {
  const [previewFile, setPreviewFile] = useState(null)
  const [previewError, setPreviewError] = useState(false)
  const files = Array.isArray(attachments)
    ? attachments.map((attachment, index) => getFileDetails(attachment, index))
    : []

  const openPreview = (file) => {
    setPreviewError(false)
    setPreviewFile(file)
  }

  const closePreview = () => {
    setPreviewFile(null)
    setPreviewError(false)
  }

  return (
    <>
      {files.length === 0 ? (
        <p className="py-4 text-center text-sm text-gray-500">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {files.map((file, index) => (
            <AttachmentCard
              key={`${file.url || "unavailable"}-${file.name}-${index}`}
              file={file}
              onPreview={openPreview}
            />
          ))}
        </div>
      )}

      <Dialog open={Boolean(previewFile)} onOpenChange={(open) => !open && closePreview()}>
        <DialogContent className="flex max-h-[92vh] w-[calc(100%-1.5rem)] max-w-5xl flex-col overflow-hidden p-4 sm:p-6">
          <DialogHeader className="pr-8 text-left">
            <DialogTitle className="break-words">{previewFile?.name || "Image preview"}</DialogTitle>
            <DialogDescription>Image attachment preview</DialogDescription>
          </DialogHeader>

          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-lg bg-gray-950 p-2 sm:p-4">
            {previewFile && !previewError ? (
              <img
                src={previewFile.url}
                alt={previewFile.name}
                className="max-h-[68vh] max-w-full object-contain"
                onError={() => setPreviewError(true)}
              />
            ) : (
              <p className="p-8 text-center text-sm text-white">Image preview is unavailable.</p>
            )}
          </div>

          <DialogFooter>
            {previewFile && <DownloadButton file={previewFile} />}
            <Button type="button" variant="outline" onClick={closePreview}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
