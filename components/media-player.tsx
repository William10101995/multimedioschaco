"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { X, Volume2, VolumeX, Maximize, Info, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { MediaSource } from "@/lib/media-sources";

interface MediaPlayerProps {
  source: MediaSource;
  onClose: () => void;
  onChangeMedia?: () => void;
  isFullscreen?: boolean;
}

function addYouTubeParams(
  url: string,
  params: Record<string, string | number | boolean>
) {
  const urlObj = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.set(key, String(value));
  });
  return urlObj.toString();
}

export default function MediaPlayer({
  source,
  onClose,
  onChangeMedia,
  isFullscreen = false,
}: MediaPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayerFullscreen, setIsPlayerFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);
  const youtubeUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // Store original YouTube URL for later use
    if (source.type === "tv" || source.type === "streaming") {
      if (source.url.includes("youtube.com")) {
        youtubeUrlRef.current = source.url;
      }
    }

    // Handle HLS video streams
    if (source.type === "tv" || source.type === "streaming") {
      if (source.url.includes(".m3u8") && videoRef.current) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(source.url);
          hls.attachMedia(videoRef.current);

          return () => {
            hls.destroy();
          };
        } else if (
          videoRef.current.canPlayType("application/vnd.apple.mpegurl")
        ) {
          // Native HLS support (Safari)
          videoRef.current.src = source.url;
        }
      }
    }
    // Autoplay radio streams
    if (source.type === "radio" && audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.play().catch(() => {
        // Autoplay puede fallar si no está silenciado
      });
    }
    // Hide controls after 3 seconds
    startControlsTimer();

    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [source, isMuted]);

  const startControlsTimer = () => {
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }

    controlsTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const toggleMute = () => {
    // Invertir el estado de silencio
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    // Manejar videos y audios normales
    if (videoRef.current) {
      videoRef.current.muted = newMutedState;
    }
    if (audioRef.current) {
      audioRef.current.muted = newMutedState;
    }

    // Manejar YouTube - recargar el iframe con el nuevo estado de mute
    if (
      source.url.includes("youtube.com") &&
      iframeRef.current &&
      youtubeUrlRef.current
    ) {
      try {
        // Usar la función addYouTubeParams para actualizar la URL con el nuevo estado de mute
        const newSrc = addYouTubeParams(youtubeUrlRef.current, {
          autoplay: 1,
          mute: newMutedState ? 1 : 0,
          enablejsapi: 1,
        });

        // Actualizar el src del iframe
        iframeRef.current.src = newSrc;
      } catch (error) {
        console.error("Error al cambiar el estado de mute en YouTube:", error);
      }
    }
  };

  const toggleFullscreen = () => {
    const element = videoRef.current || iframeRef.current;
    if (!element) return;

    if (!isPlayerFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsPlayerFullscreen(!isPlayerFullscreen);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    startControlsTimer();
  };

  const getTypeIcon = () => {
    switch (source.type) {
      case "radio":
        return <Radio className="h-3 w-3 mr-1" />;
      case "tv":
        return <Tv className="h-3 w-3 mr-1" />;
      case "streaming":
        return <Play className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  // Modificar la función onChangeMedia para usar el nuevo enfoque en pantalla completa
  const handleChangeMedia = () => {
    if (onChangeMedia) {
      onChangeMedia();
    }
  };

  return (
    <div
      className="relative h-full w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowControls(true)}
    >
      {/* Media player based on type */}
      {source.type === "radio" && (
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
          <div className="text-center p-4 max-w-xs">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
              <Radio className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-white">
              {source.name}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs mb-3">
              {source.description || "Radio en vivo"}
            </p>
            <audio
              ref={audioRef}
              src={source.url}
              autoPlay
              muted={isMuted}
              className="w-full"
              controls
            />
          </div>
        </div>
      )}

      {(source.type === "tv" || source.type === "streaming") &&
        source.url.includes("youtube.com") && (
          <iframe
            ref={iframeRef}
            src={addYouTubeParams(source.url, {
              autoplay: 1,
              mute: isMuted ? 1 : 0,
              enablejsapi: 1,
            })}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        )}

      {(source.type === "tv" || source.type === "streaming") &&
        !source.url.includes("youtube.com") &&
        !source.url.includes("facebook.com") && (
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            playsInline
            className="w-full h-full object-contain bg-black"
            controls={false}
          >
            {!source.url.includes(".m3u8") && <source src={source.url} />}
            Tu navegador no soporta la reproducción de video.
          </video>
        )}

      {(source.type === "tv" || source.type === "streaming") &&
        source.url.includes("facebook.com") && (
          <iframe
            ref={iframeRef}
            src={source.url}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        )}

      {/* Controls overlay */}
      <div
        className={`absolute top-0 left-0 w-full p-2 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center">
          <div className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded mr-1.5 flex items-center">
            {getTypeIcon()}
            {source.type.toUpperCase()}
          </div>
          <h3 className="font-medium text-xs md:text-sm truncate max-w-[100px] md:max-w-[150px] text-white">
            {source.name}
          </h3>
          {source.description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 text-white hover:bg-black/30 ml-1"
                  >
                    <Info className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs">
                  <p>{source.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-black/30"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-3 w-3" />
            ) : (
              <Volume2 className="h-3 w-3" />
            )}
          </Button>

          {onChangeMedia && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-black/30"
              onClick={handleChangeMedia}
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
          )}

          {(source.type === "tv" || source.type === "streaming") &&
            !isFullscreen && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-black/30"
                onClick={toggleFullscreen}
              >
                <Maximize className="h-3 w-3" />
              </Button>
            )}

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-black/30 hover:text-red-400"
            onClick={onClose}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Import icons
function Radio(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </svg>
  );
}

function Tv(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="15" x="2" y="3" rx="2" />
      <polyline points="8 21 12 17 16 21" />
    </svg>
  );
}

function Play(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}
