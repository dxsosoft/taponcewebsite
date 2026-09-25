"use client"

import * as React from "react"
import { Upload, CheckCircle2, X, Image as ImageIcon } from "lucide-react"

export interface CompanyLogoUploadProps {
  logoUrl?: string | null
  logoFileName?: string | null
  onLogoChange: (data: { logoUrl: string | null; logoFileName: string }) => void
  className?: string
  label?: string
  sublabel?: string
  helperText?: string
}

/**
 * CompanyLogoUpload
 *
 * Reusable, optional drag-and-drop & click-to-upload component for company logos.
 * Converts uploaded image files (.png, .jpg, .jpeg, .svg up to 5MB) into Data URLs
 * for immediate Live Card Preview rendering and backend order persistence.
 */
export function CompanyLogoUpload({
  logoUrl,
  logoFileName,
  onLogoChange,
  className = "",
  label = "Company Logo (optional)",
  sublabel = "Add your company logo (optional)",
  helperText = "Upload your brand logo (.png, .jpg, .svg) to replace the default TapOnce mark on your card.",
}: CompanyLogoUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const processFile = React.useCallback(
    (file: File) => {
      setError(null)

      // Validate file format
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"]
      const hasValidExt = /\.(png|jpe?g|svg)$/i.test(file.name)
      if (!validTypes.includes(file.type) && !hasValidExt) {
        setError("Invalid format. Please upload a PNG, JPG, or SVG image.")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit. Please upload a smaller logo.")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const url = event.target?.result as string
        if (url) {
          onLogoChange({ logoUrl: url, logoFileName: file.name })
        }
      }
      reader.onerror = () => {
        setError("Failed to read image file. Please try another file.")
      }
      reader.readAsDataURL(file)
    },
    [onLogoChange]
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onLogoChange({ logoUrl: null, logoFileName: "" })
  }

  const isUploaded = Boolean(logoUrl && logoFileName)

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Label and Sublabel Header */}
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
          <ImageIcon className="h-3.5 w-3.5 text-accent" />
          <span>{label}</span>
        </label>
        <span className="text-[11px] text-muted font-normal">{sublabel}</span>
      </div>

      {helperText && (
        <p className="text-[11px] text-muted leading-relaxed">
          {helperText}
        </p>
      )}

      {/* Dropzone Container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (!isUploaded && fileInputRef.current) {
            fileInputRef.current.click()
          }
        }}
        className={`relative border-2 border-dashed rounded-xl p-3.5 transition-all select-none ${
          isUploaded
            ? "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-950/20"
            : isDragging
            ? "border-accent bg-accent/10 shadow-sm"
            : "border-border hover:border-accent/50 bg-surface-hover/40 cursor-pointer"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.svg"
          onChange={handleFileSelect}
          className="hidden"
          aria-label={label}
        />

        {isUploaded ? (
          /* Uploaded Success State with Thumbnail and Remove Action */
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Thumbnail with adaptive background */}
              <div className="w-10 h-10 rounded-lg bg-surface border border-border/80 p-1 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                <img
                  src={logoUrl!}
                  alt={logoFileName || "Uploaded Company Logo"}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate max-w-[200px] sm:max-w-[260px]">
                    {logoFileName}
                  </span>
                </div>
                <p className="text-[10px] text-muted mt-0.5">
                  Applied live to card preview
                </p>
              </div>
            </div>

            {/* Right Buttons: Change / Remove */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-semibold text-accent hover:underline px-1.5 py-1 cursor-pointer"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemove}
                title="Remove logo"
                aria-label="Remove uploaded company logo"
                className="p-1 rounded-lg hover:bg-surface border border-border/60 text-muted hover:text-red-500 transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Unuploaded Empty Prompt State */
          <div className="flex flex-col items-center justify-center gap-1.5 py-1 text-center">
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
              <Upload className="h-4.5 w-4.5" />
            </div>
            <div className="text-xs text-muted">
              <span className="font-semibold text-accent hover:underline">
                Click to upload
              </span>{" "}
              or drag and drop logo here
            </div>
            <span className="text-[10px] text-muted/80">
              PNG, JPG, or SVG (transparent background recommended, max 5MB)
            </span>
          </div>
        )}
      </div>

      {error && (
        <p className="text-[11px] font-medium text-red-500 mt-1 flex items-center gap-1">
          <span>•</span> {error}
        </p>
      )}
    </div>
  )
}
