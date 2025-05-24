"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Radio, Tv } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { MediaSource } from "@/lib/media-sources"

interface MediaSelectorProps {
  availableMedia: MediaSource[]
  onSelectMedia: (mediaId: string) => void
  isFullscreen?: boolean
}

export default function MediaSelectorFullscreen({
  availableMedia,
  onSelectMedia,
  isFullscreen = false,
}: MediaSelectorProps) {
  // Group media by type
  const radioSources = availableMedia.filter((m) => m.type === "radio")
  const tvSources = availableMedia.filter((m) => m.type === "tv")
  const streamingSources = availableMedia.filter((m) => m.type === "streaming")

  // Estado para manejar la lista desplegable personalizada
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Calcular la posición del dropdown
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">("bottom")

  // Efecto para calcular si el dropdown debe mostrarse arriba o abajo
  useEffect(() => {
    if (showDropdown && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const dropdownHeight = 300 // altura estimada del dropdown

      // Si no hay suficiente espacio abajo, mostrar arriba
      if (buttonRect.bottom + dropdownHeight > windowHeight) {
        setDropdownPosition("top")
      } else {
        setDropdownPosition("bottom")
      }
    }
  }, [showDropdown])

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showDropdown])

  // Función para manejar la selección de un medio
  const handleSelectMedia = (mediaId: string) => {
    onSelectMedia(mediaId)
    setShowDropdown(false)
  }

  // Determinar qué lista mostrar basado en el tipo seleccionado
  const getMediaList = () => {
    switch (selectedType) {
      case "radio":
        return radioSources
      case "tv":
        return tvSources
      case "streaming":
        return streamingSources
      default:
        return [...radioSources, ...tvSources, ...streamingSources]
    }
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-2 bg-slate-50 dark:bg-slate-800/50">
      <div className="text-center mb-2">
        <div className="inline-block p-2 rounded-full bg-slate-100 dark:bg-slate-700/50 mb-2">
          <Play className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">Seleccionar medio</p>
      </div>

      <Tabs defaultValue="quick" className="w-full">
        <TabsList className="grid grid-cols-2 bg-slate-100 dark:bg-slate-700/50 mb-2">
          <TabsTrigger value="quick" className="text-xs data-[state=active]:bg-blue-600">
            Rápido
          </TabsTrigger>
          <TabsTrigger value="all" className="text-xs data-[state=active]:bg-blue-600">
            Todos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="quick" className="mt-0">
          <div className="grid grid-cols-3 gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs bg-white dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600"
              onClick={() => {
                if (radioSources.length > 0) {
                  const randomIndex = Math.floor(Math.random() * radioSources.length)
                  onSelectMedia(radioSources[randomIndex].id)
                }
              }}
            >
              <Radio className="h-3 w-3 mr-1" />
              Radio
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs bg-white dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600"
              onClick={() => {
                if (tvSources.length > 0) {
                  const randomIndex = Math.floor(Math.random() * tvSources.length)
                  onSelectMedia(tvSources[randomIndex].id)
                }
              }}
            >
              <Tv className="h-3 w-3 mr-1" />
              TV
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs bg-white dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600"
              onClick={() => {
                if (streamingSources.length > 0) {
                  const randomIndex = Math.floor(Math.random() * streamingSources.length)
                  onSelectMedia(streamingSources[randomIndex].id)
                }
              }}
            >
              <Play className="h-3 w-3 mr-1" />
              Stream
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="all" className="mt-0">
          {/* Selector personalizado para pantalla completa */}
          <div className="relative w-full">
            <button
              ref={buttonRef}
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full h-8 text-xs bg-white dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded px-3 py-1 text-left flex items-center justify-between"
            >
              <span className="text-slate-700 dark:text-slate-300">
                {showDropdown ? "Cerrar" : "Seleccionar medio"}
              </span>
              <svg
                className={`h-4 w-4 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {showDropdown && (
              <div
                ref={dropdownRef}
                className={`fixed z-50 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-lg overflow-hidden ${
                  dropdownPosition === "top" ? "dropdown-position-top" : "dropdown-position-bottom"
                }`}
                style={{
                  left: buttonRef.current ? `${buttonRef.current.getBoundingClientRect().left}px` : "0",
                  width: buttonRef.current ? `${buttonRef.current.offsetWidth}px` : "100%",
                  maxHeight: "300px",
                  overflowY: "auto",
                  ...(dropdownPosition === "top"
                    ? {
                        bottom: buttonRef.current
                          ? `${window.innerHeight - buttonRef.current.getBoundingClientRect().top}px`
                          : "0",
                      }
                    : { top: buttonRef.current ? `${buttonRef.current.getBoundingClientRect().bottom}px` : "0" }),
                }}
              >
                <div className="p-2">
                  {/* Filtros por tipo */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`h-6 text-xs ${selectedType === null ? "bg-blue-100 dark:bg-blue-900/30" : ""}`}
                      onClick={() => setSelectedType(null)}
                    >
                      Todos
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`h-6 text-xs ${selectedType === "radio" ? "bg-blue-100 dark:bg-blue-900/30" : ""}`}
                      onClick={() => setSelectedType("radio")}
                    >
                      <Radio className="h-3 w-3 mr-1" />
                      Radio
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`h-6 text-xs ${selectedType === "tv" ? "bg-blue-100 dark:bg-blue-900/30" : ""}`}
                      onClick={() => setSelectedType("tv")}
                    >
                      <Tv className="h-3 w-3 mr-1" />
                      TV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`h-6 text-xs ${selectedType === "streaming" ? "bg-blue-100 dark:bg-blue-900/30" : ""}`}
                      onClick={() => setSelectedType("streaming")}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Stream
                    </Button>
                  </div>

                  {/* Lista de medios */}
                  <div className="space-y-1 max-h-[200px] overflow-y-auto">
                    {getMediaList().map((media) => (
                      <button
                        key={media.id}
                        className="w-full text-left px-2 py-1 text-xs hover:bg-slate-100 dark:hover:bg-slate-700 rounded flex items-center"
                        onClick={() => handleSelectMedia(media.id)}
                      >
                        {media.type === "radio" && <Radio className="h-3 w-3 mr-2 text-blue-600 dark:text-blue-400" />}
                        {media.type === "tv" && <Tv className="h-3 w-3 mr-2 text-blue-600 dark:text-blue-400" />}
                        {media.type === "streaming" && (
                          <Play className="h-3 w-3 mr-2 text-blue-600 dark:text-blue-400" />
                        )}
                        <span className="truncate">{media.name}</span>
                      </button>
                    ))}

                    {getMediaList().length === 0 && (
                      <div className="text-center py-2 text-xs text-slate-500 dark:text-slate-400">
                        No hay medios disponibles
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
