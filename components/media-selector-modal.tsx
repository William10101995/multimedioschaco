"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import type { MediaSource } from "@/lib/media-sources"
import { Radio, Tv, Play, X } from "lucide-react"

interface MediaSelectorModalProps {
  availableMedia: MediaSource[]
  onSelectMedia: (mediaId: string) => void
  onClose: () => void
}

export default function MediaSelectorModal({ availableMedia, onSelectMedia, onClose }: MediaSelectorModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Agrupar medios por tipo
  const radioSources = availableMedia.filter((m) => m.type === "radio")
  const tvSources = availableMedia.filter((m) => m.type === "tv")
  const streamingSources = availableMedia.filter((m) => m.type === "streaming")

  // Cerrar modal con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  // Cerrar modal al hacer clic fuera
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose()
    }
  }

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-[90%] max-w-md max-h-[80vh] overflow-y-auto">
        <div className="p-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>

          <h3 className="text-lg font-medium mb-4 text-slate-900 dark:text-white">Seleccionar medio</h3>

          {radioSources.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 flex items-center text-slate-800 dark:text-slate-200">
                <Radio className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                Radio
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {radioSources.map((media) => (
                  <button
                    key={media.id}
                    className="text-left px-3 py-2 text-sm bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200"
                    onClick={() => {
                      onSelectMedia(media.id)
                      onClose()
                    }}
                  >
                    {media.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tvSources.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 flex items-center text-slate-800 dark:text-slate-200">
                <Tv className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                TV
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {tvSources.map((media) => (
                  <button
                    key={media.id}
                    className="text-left px-3 py-2 text-sm bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200"
                    onClick={() => {
                      onSelectMedia(media.id)
                      onClose()
                    }}
                  >
                    {media.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {streamingSources.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 flex items-center text-slate-800 dark:text-slate-200">
                <Play className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                Streaming
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {streamingSources.map((media) => (
                  <button
                    key={media.id}
                    className="text-left px-3 py-2 text-sm bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200"
                    onClick={() => {
                      onSelectMedia(media.id)
                      onClose()
                    }}
                  >
                    {media.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
