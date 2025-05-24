"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Maximize, Minimize } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface FullscreenButtonProps {
  targetId: string
  className?: string
}

export function FullscreenButton({ targetId, className = "" }: FullscreenButtonProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const isMobile = useMobile()

  // Update fullscreen state when it changes externally (e.g., Esc key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Modificar el botón de pantalla completa para que oculte los controles al activarse
  const toggleFullscreen = () => {
    const element = document.getElementById(targetId)
    if (!element) return

    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element
          .requestFullscreen()
          .then(() => {
            // Asegurarse de que los controles se oculten después de entrar en pantalla completa
            const event = new Event("fullscreenchange")
            document.dispatchEvent(event)
          })
          .catch((err) => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`)
          })
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  return (
    <Button
      variant="outline"
      size={isMobile ? "icon" : "sm"}
      onClick={toggleFullscreen}
      className={`${className} bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600`}
      title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
    >
      {isFullscreen ? (
        <>
          <Minimize className="h-4 w-4" />
          {!isMobile && <span className="ml-2 hidden sm:inline">Salir</span>}
        </>
      ) : (
        <>
          <Maximize className="h-4 w-4" />
          {!isMobile && <span className="ml-2 hidden sm:inline">Pantalla completa</span>}
        </>
      )}
    </Button>
  )
}
