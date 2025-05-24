"use client";
import { Button } from "@/components/ui/button";
import { Play, Radio, Tv } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MediaSource } from "@/lib/media-sources";

interface MediaSelectorProps {
  availableMedia: MediaSource[];
  onSelectMedia: (mediaId: string) => void;
  isFullscreen?: boolean;
}

export default function MediaSelector({
  availableMedia,
  onSelectMedia,
  isFullscreen = false,
}: MediaSelectorProps) {
  // Group media by type
  const radioSources = availableMedia.filter((m) => m.type === "radio");
  const tvSources = availableMedia.filter((m) => m.type === "tv");
  const streamingSources = availableMedia.filter((m) => m.type === "streaming");

  return (
    <div className="h-full flex flex-col items-center justify-center p-2 bg-slate-50 dark:bg-slate-800/50">
      <div className="text-center mb-2">
        <div className="inline-block p-2 rounded-full bg-slate-100 dark:bg-slate-700/50 mb-2">
          <Play className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">
          Seleccionar medio
        </p>
      </div>

      {/* Diseño para pantallas grandes */}
      <div className="hidden sm:block w-full">
        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="grid grid-cols-2 bg-slate-100 dark:bg-slate-700/50 mb-2">
            <TabsTrigger
              value="quick"
              className="text-xs data-[state=active]:bg-blue-600"
            >
              Rápido
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="text-xs data-[state=active]:bg-blue-600"
            >
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
                    const randomIndex = Math.floor(
                      Math.random() * radioSources.length
                    );
                    onSelectMedia(radioSources[randomIndex].id);
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
                    const randomIndex = Math.floor(
                      Math.random() * tvSources.length
                    );
                    onSelectMedia(tvSources[randomIndex].id);
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
                    const randomIndex = Math.floor(
                      Math.random() * streamingSources.length
                    );
                    onSelectMedia(streamingSources[randomIndex].id);
                  }
                }}
              >
                <Play className="h-3 w-3 mr-1" />
                Stream
              </Button>
            </div>
          </TabsContent>
          <TabsContent
            value="all"
            className="mt-0 max-h-[120px] overflow-y-auto pr-1"
          >
            <div className="fullscreen-select-wrapper">
              <Select
                onValueChange={(value) => {
                  if (value !== "placeholder") {
                    onSelectMedia(value);
                  }
                }}
              >
                <SelectTrigger className="w-full h-8 text-xs bg-white dark:bg-slate-700/50 border-slate-200 dark:border-slate-600">
                  <SelectValue placeholder="Seleccionar medio" />
                </SelectTrigger>
                <SelectContent
                  className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 fullscreen-select-content"
                  position={isFullscreen ? "popper" : "popper"}
                  align="center"
                  sideOffset={5}
                >
                  {radioSources.length > 0 && (
                    <SelectGroup>
                      <SelectLabel className="flex items-center text-xs py-1 pl-2">
                        <Radio className="h-3 w-3 mr-1.5 text-blue-600 dark:text-blue-400" />
                        Radio
                      </SelectLabel>
                      {radioSources.map((media) => (
                        <SelectItem
                          key={media.id}
                          value={media.id}
                          className="focus:bg-slate-100 dark:focus:bg-slate-700 pl-6 text-xs"
                        >
                          {media.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}

                  {tvSources.length > 0 && (
                    <SelectGroup>
                      <SelectLabel className="flex items-center text-xs py-1 pl-2 mt-1">
                        <Tv className="h-3 w-3 mr-1.5 text-blue-600 dark:text-blue-400" />
                        TV
                      </SelectLabel>
                      {tvSources.map((media) => (
                        <SelectItem
                          key={media.id}
                          value={media.id}
                          className="focus:bg-slate-100 dark:focus:bg-slate-700 pl-6 text-xs"
                        >
                          {media.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}

                  {streamingSources.length > 0 && (
                    <SelectGroup>
                      <SelectLabel className="flex items-center text-xs py-1 pl-2 mt-1">
                        <Play className="h-3 w-3 mr-1.5 text-blue-600 dark:text-blue-400" />
                        Streaming
                      </SelectLabel>
                      {streamingSources.map((media) => (
                        <SelectItem
                          key={media.id}
                          value={media.id}
                          className="focus:bg-slate-100 dark:focus:bg-slate-700 pl-6 text-xs"
                        >
                          {media.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Diseño para pantallas móviles */}
      <div className="block sm:hidden w-full">
        <div className="fullscreen-select-wrapper">
          <Select
            onValueChange={(value) => {
              if (value !== "placeholder") {
                onSelectMedia(value);
              }
            }}
          >
            <SelectTrigger className="w-full h-12 text-sm bg-white dark:bg-slate-700/50 border-slate-200 dark:border-slate-600">
              <SelectValue placeholder="Seleccionar medio" />
            </SelectTrigger>
            <SelectContent
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              position={isFullscreen ? "popper" : "popper"}
              align="center"
              sideOffset={5}
            >
              {radioSources.length > 0 && (
                <SelectGroup>
                  <SelectLabel className="flex items-center text-sm py-1 pl-2">
                    <Radio className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                    Radio
                  </SelectLabel>
                  {radioSources.map((media) => (
                    <SelectItem
                      key={media.id}
                      value={media.id}
                      className="focus:bg-slate-100 dark:focus:bg-slate-700 pl-6 text-sm"
                    >
                      {media.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}

              {tvSources.length > 0 && (
                <SelectGroup>
                  <SelectLabel className="flex items-center text-sm py-1 pl-2 mt-2">
                    <Tv className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                    TV
                  </SelectLabel>
                  {tvSources.map((media) => (
                    <SelectItem
                      key={media.id}
                      value={media.id}
                      className="focus:bg-slate-100 dark:focus:bg-slate-700 pl-6 text-sm"
                    >
                      {media.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}

              {streamingSources.length > 0 && (
                <SelectGroup>
                  <SelectLabel className="flex items-center text-sm py-1 pl-2 mt-2">
                    <Play className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                    Streaming
                  </SelectLabel>
                  {streamingSources.map((media) => (
                    <SelectItem
                      key={media.id}
                      value={media.id}
                      className="focus:bg-slate-100 dark:focus:bg-slate-700 pl-6 text-sm"
                    >
                      {media.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
