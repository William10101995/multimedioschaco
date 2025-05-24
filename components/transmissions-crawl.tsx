"use client"

import { useEffect, useRef, useState } from "react"
import { defaultMediaSources } from "@/lib/media-sources"
import { Radio, Tv, Play } from "lucide-react"

export default function TransmissionsCrawl() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Efecto para el scroll automático
  useEffect(() => {
    if (!scrollRef.current || isHovered) return

    const scrollContainer = scrollRef.current
    let animationFrameId: number
    let scrollPosition = 0

    const scroll = () => {
      if (!scrollContainer) return

      scrollPosition += 0.5
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }

      scrollContainer.scrollLeft = scrollPosition
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isHovered])

  // Agrupar medios por tipo
  const radioSources = defaultMediaSources.filter((m) => m.type === "radio")
  const tvSources = defaultMediaSources.filter((m) => m.type === "tv")
  const streamingSources = defaultMediaSources.filter((m) => m.type === "streaming")

  // Función para obtener el icono según el tipo
  const getIcon = (type: "radio" | "tv" | "streaming") => {
    switch (type) {
      case "radio":
        return <Radio className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      case "tv":
        return <Tv className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      case "streaming":
        return <Play className="h-4 w-4 text-blue-600 dark:text-blue-400" />
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 border-t border-b border-slate-200 dark:border-slate-700 py-4">
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white flex items-center">
          <span className="w-2 h-5 bg-blue-600 dark:bg-blue-500 rounded-sm mr-2"></span>
          Nuestras Transmisiones
        </h2>

        <div
          className="overflow-hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={scrollRef}
            className="flex space-x-4 py-2 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Duplicamos el contenido para crear un efecto de scroll infinito */}
            {[
              ...radioSources,
              ...tvSources,
              ...streamingSources,
              ...radioSources,
              ...tvSources,
              ...streamingSources,
            ].map((source, index) => (
              <div
                key={`${source.id}-${index}`}
                className="flex-shrink-0 w-36 h-20 bg-slate-50 dark:bg-slate-700/50 rounded-md border border-slate-200 dark:border-slate-600 flex flex-col items-center justify-center p-2 transition-transform hover:scale-105"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-600 flex items-center justify-center mb-1">
                  {getIcon(source.type)}
                </div>
                <p className="text-xs font-medium text-center text-slate-700 dark:text-slate-300 truncate w-full">
                  {source.name}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate w-full text-center">
                  {source.type === "radio" ? "Radio" : source.type === "tv" ? "Televisión" : "Streaming"}
                </p>
              </div>
            ))}
          </div>

          {/* Gradientes para indicar que hay más contenido */}
          <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white dark:from-slate-800 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white dark:from-slate-800 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  )
}
