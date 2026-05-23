"use client";

import { Maximize, Play, Settings, Video } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function CameraFeed() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-3xl border bg-black shadow-2xl">
      <div className={`relative h-full w-full transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-50"}`}>
        <Image
          src="/camera-feed.png"
          alt="Live Camera Feed"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
        />
      </div>

      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          <span className={`h-2 w-2 rounded-full ${isPlaying ? "animate-pulse bg-red-500" : "bg-gray-500"}`} />
          {isPlaying ? "LIVE" : "PAUSED"}
        </div>
        <div className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          CAM-01 | Farm Together
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 to-transparent p-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-full bg-white/15 p-2 transition-colors hover:bg-primary"
            aria-label={isPlaying ? "Táº¡m dá»«ng camera" : "PhÃ¡t camera"}
          >
            {isPlaying ? <Video className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <div>
            <p className="text-sm font-bold">Khu rau xanh Farm Together</p>
            <p className="text-xs text-white/70">Äá»™ trá»… mÃ´ phá»ng: 2 giÃ¢y</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full bg-white/15 p-2 transition-colors hover:bg-primary" aria-label="CÃ i Ä‘áº·t camera">
            <Settings className="h-5 w-5" />
          </button>
          <button className="rounded-full bg-white/15 p-2 transition-colors hover:bg-primary" aria-label="PhÃ³ng to camera">
            <Maximize className="h-5 w-5" />
          </button>
        </div>
      </div>

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(true)}
            className="rounded-full bg-white/20 p-5 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-primary"
            aria-label="PhÃ¡t láº¡i camera"
          >
            <Play className="ml-1 h-9 w-9" />
          </button>
        </div>
      )}
    </div>
  );
}


