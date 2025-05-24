"use client"

import { useState, useEffect, useRef } from "react"
import MediaPlayer from "@/components/media-player"
import MediaSelector from "@/components/media-selector"
import MediaSelectorFullscreen from "@/components/media-selector-fullscreen"
import MediaSelectorModal from "@/components/media-selector-modal"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { defaultMediaSources } from "@/lib/media-sources"
import { Trash2, Shuffle, LayoutGrid, Menu, Maximize, Minimize } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMobile } from "@/hooks/use-mobile"
import { FullscreenButton } from "@/components/fullscreen-button"

export default function MediaGrid() {
  const [gridSize, setGridSize] = useState<number>(3)
  const [selectedMedia, setSelectedMedia] = useState<Array<string | null>>([])
  const [availableMedia, setAvailableMedia] = useState(defaultMediaSources)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [activeCell, setActiveCell] = useState<number | null>(null)
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMobile()

  // Check fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenActive = !!document.fullscreenElement
      setIsFullscreen(fullscreenActive)

      // Ocultar controles inmediatamente al entrar en fullscreen
      if (fullscreenActive) {
        setShowControls(false)
        document.body.classList.add("is-fullscreen")
      } else {
        document.body.classList.remove("is-fullscreen")
        setShowControls(true)

        // Cerrar el modal al salir de pantalla completa
        setShowModal(false)
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current)
      }
      document.body.classList.remove("is-fullscreen")
    }
  }, [])

  // Handle mouse movement to show controls in fullscreen
  useEffect(() => {
    if (!isFullscreen) return

    const handleMouseMove = () => {
      setShowControls(true)
      startControlsTimer()
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isFullscreen])

  // Start timer to hide controls
  const startControlsTimer = () => {
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current)
    }

    controlsTimerRef.current = setTimeout(() => {
      if (isFullscreen) {
        setShowControls(false)
      }
    }, 5000)
  }

  // Get a random media source
  const getRandomMedia = () => {
    const randomIndex = Math.floor(Math.random() * availableMedia.length)
    return availableMedia[randomIndex].id
  }

  // Initialize selected media with random values based on grid size
  useEffect(() => {
    const randomMediaArray = Array(gridSize * gridSize)
      .fill(null)
      .map(() => getRandomMedia())
    setSelectedMedia(randomMediaArray)
  }, [gridSize, availableMedia])

  // Update a specific cell with selected media
  const updateMediaCell = (index: number, mediaId: string | null) => {
    const newSelectedMedia = [...selectedMedia]
    newSelectedMedia[index] = mediaId
    setSelectedMedia(newSelectedMedia)
  }

  // Randomize all cells
  const randomizeAll = () => {
    const randomMediaArray = selectedMedia.map(() => getRandomMedia())
    setSelectedMedia(randomMediaArray)
  }

  // Calculate how many items to show on mobile
  const visibleItemsCount = isMobile && !isFullscreen ? Math.min(4, selectedMedia.length) : selectedMedia.length

  // Función para mostrar el selector de medios
  const showMediaSelector = (index: number) => {
    if (isFullscreen) {
      setActiveCell(index)
      setShowModal(true)
    } else {
      // Comportamiento normal fuera de pantalla completa
      const newSelectedMedia = [...selectedMedia]
      newSelectedMedia[index] = null
      setSelectedMedia(newSelectedMedia)
    }
  }

  // Función para seleccionar un medio desde el modal
  const handleSelectMedia = (mediaId: string) => {
    if (activeCell !== null) {
      updateMediaCell(activeCell, mediaId)
    }
  }

  // Función para alternar pantalla completa
  const toggleFullscreen = () => {
    const element = document.getElementById("fullscreen-container")
    if (!element) return

    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  return (
    <div className={`space-y-6 ${isFullscreen ? "fullscreen-grid-container" : ""}`} id="media-matrix">
      <div
        className={`bg-white dark:bg-slate-800/50 rounded-md p-4 shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-300 ${
          isFullscreen
            ? showControls
              ? "opacity-100 transform-none"
              : "opacity-0 pointer-events-none -translate-y-full absolute"
            : "opacity-100"
        }`}
      >
        {/* Versión móvil mejorada - solo iconos */}
        {isMobile ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-grow">
                <label
                  htmlFor="grid-size"
                  className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300"
                >
                  Tamaño de la matriz
                </label>
                <div className="flex items-center gap-2">
                  <Select value={gridSize.toString()} onValueChange={(value) => setGridSize(Number.parseInt(value))}>
                    <SelectTrigger className="w-full h-9 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                      <SelectValue placeholder="Tamaño" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                      <SelectItem value="2" className="focus:bg-slate-100 dark:focus:bg-slate-700">
                        2x2
                      </SelectItem>
                      <SelectItem value="3" className="focus:bg-slate-100 dark:focus:bg-slate-700">
                        3x3
                      </SelectItem>
                      <SelectItem value="4" className="focus:bg-slate-100 dark:focus:bg-slate-700">
                        4x4
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-9 w-9 flex-shrink-0">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={toggleFullscreen}>
                        {isFullscreen ? <Minimize className="h-4 w-4 mr-2" /> : <Maximize className="h-4 w-4 mr-2" />}
                        {isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={randomizeAll}>
                        <Shuffle className="h-4 w-4 mr-2" />
                        Aleatorio
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedMedia(Array(gridSize * gridSize).fill(null))}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Limpiar todo
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                onClick={toggleFullscreen}
                className="h-9 w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600"
                size="icon"
                title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
              >
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>

              <Button
                variant="outline"
                onClick={randomizeAll}
                className="h-9 w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600"
                size="icon"
                title="Aleatorio"
              >
                <Shuffle className="h-5 w-5" />
              </Button>

              <Button
                variant="destructive"
                onClick={() => setSelectedMedia(Array(gridSize * gridSize).fill(null))}
                className="h-9 w-full bg-red-600 hover:bg-red-700 text-white"
                size="icon"
                title="Limpiar todo"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ) : (
          // Versión desktop original
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center justify-between sm:justify-start gap-4">
              <div>
                <label
                  htmlFor="grid-size"
                  className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
                >
                  Tamaño de la matriz
                </label>
                <Select value={gridSize.toString()} onValueChange={(value) => setGridSize(Number.parseInt(value))}>
                  <SelectTrigger className="w-32 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                    <SelectValue placeholder="Tamaño" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <SelectItem value="2" className="focus:bg-slate-100 dark:focus:bg-slate-700">
                      2x2
                    </SelectItem>
                    <SelectItem value="3" className="focus:bg-slate-100 dark:focus:bg-slate-700">
                      3x3
                    </SelectItem>
                    <SelectItem value="4" className="focus:bg-slate-100 dark:focus:bg-slate-700">
                      4x4
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <FullscreenButton targetId="fullscreen-container" />

              <Button
                variant="outline"
                onClick={randomizeAll}
                className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200"
                size="sm"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Aleatorio
              </Button>
              <Button
                variant="destructive"
                onClick={() => setSelectedMedia(Array(gridSize * gridSize).fill(null))}
                className="bg-red-600 hover:bg-red-700 text-white"
                size="sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpiar todo
              </Button>
            </div>
          </div>
        )}

        {/* Mobile view toggle info */}
        {isMobile && !isFullscreen && selectedMedia.length > 4 && (
          <div className="mt-3 text-xs text-center text-slate-500 dark:text-slate-400 flex items-center justify-center">
            <LayoutGrid className="h-3 w-3 mr-1" />
            Mostrando 4 de {selectedMedia.length} medios
          </div>
        )}
      </div>

      <div
        className={`grid ${
          isFullscreen
            ? `fullscreen-media-grid grid-cols-${gridSize}`
            : isMobile
              ? "grid-cols-1"
              : gridSize === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : gridSize === 3
                  ? "grid-cols-1 sm:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-4"
        } gap-4`}
      >
        {selectedMedia.slice(0, isFullscreen ? selectedMedia.length : visibleItemsCount).map((mediaId, index) => (
          <div
            key={index}
            className={`aspect-video rounded-md overflow-hidden border border-slate-200 dark:border-slate-700/50 transition-all duration-300 shadow-sm ${
              isFullscreen ? "fullscreen-cell" : ""
            }`}
          >
            {mediaId ? (
              <MediaPlayer
                source={availableMedia.find((m) => m.id === mediaId)!}
                onClose={() => updateMediaCell(index, null)}
                onChangeMedia={() => showMediaSelector(index)}
                isFullscreen={isFullscreen}
              />
            ) : isFullscreen ? (
              <MediaSelectorFullscreen
                availableMedia={availableMedia}
                onSelectMedia={(mediaId) => updateMediaCell(index, mediaId)}
                isFullscreen={true}
              />
            ) : (
              <MediaSelector
                availableMedia={availableMedia}
                onSelectMedia={(mediaId) => updateMediaCell(index, mediaId)}
                isFullscreen={false}
              />
            )}
          </div>
        ))}
      </div>

      {/* Modal de selección de medios */}
      {showModal && (
        <MediaSelectorModal
          availableMedia={availableMedia}
          onSelectMedia={handleSelectMedia}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
