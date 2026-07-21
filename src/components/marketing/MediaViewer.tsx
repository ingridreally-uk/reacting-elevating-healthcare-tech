import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type MediaViewerProps = {
  imageSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
};

/**
 * Renders either an image or video in the same frame.
 * Swap `imageSrc` for `videoSrc` later without changing layout.
 */
export function MediaViewer({
  imageSrc,
  videoSrc,
  posterSrc,
  alt,
  className,
  priority,
  objectPosition = "top left",
}: MediaViewerProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(Boolean(priority));

  useEffect(() => {
    setLoaded(Boolean(priority));
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [imageSrc, priority]);

  if (videoSrc) {
    return (
      <div className={cn("relative aspect-[16/10] w-full overflow-hidden bg-secondary", className)}>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition }}
          src={videoSrc}
          poster={posterSrc ?? imageSrc}
          muted
          playsInline
          autoPlay
          loop
          aria-label={alt}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative aspect-[16/10] w-full overflow-hidden bg-secondary", className)}>
      {imageSrc ? (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          draggable={false}
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0",
          )}
          style={{ objectPosition }}
        />
      ) : null}
    </div>
  );
}
