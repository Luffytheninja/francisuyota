'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

interface VideoCardProps {
  title: string;
  category: string;
  youtubeId: string;
  poster?: any;
}

export function VideoCard({ title, category, youtubeId, poster }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailUrl = poster
    ? urlFor(poster).width(800).height(450).url()
    : `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <div className="group relative w-full overflow-hidden rounded-xl bg-black/50 border border-neutral-800">
      {!isPlaying ? (
        <div
          onClick={() => setIsPlaying(true)}
          className="relative aspect-video w-full cursor-pointer overflow-hidden"
        >
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&modestbranding=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      )}
      <div className="p-4">
        <span className="text-xs font-mono uppercase text-neutral-400 capitalize">
          {category.replace(/-/g, ' ')}
        </span>
        <h3 className="text-lg font-medium text-white">{title}</h3>
      </div>
    </div>
  );
}
