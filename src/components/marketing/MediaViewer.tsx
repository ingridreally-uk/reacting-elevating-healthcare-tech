import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { MediaFit } from "./content";

type MediaViewerProps = {
  imageSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
  objectFit?: MediaFit;
  /** CSS aspect-ratio value, e.g. "16 / 10" or "21 / 9" */
  aspectRatio?: string;
  /** Show the full image at natural proportions (lightbox). */
  natural?: boolean;
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
  objectFit = "cover",
  aspectRatio = "16 / 10",
  natural = false,
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
      <div
        className={cn("relative w-full overflow-hidden bg-secondary", className)}
        style={natural ? undefined : { aspectRatio }}
      >
        <video
          className={cn(
            natural
              ? "h-auto w-full"
              : "absolute inset-0 h-full w-full",
            objectFit === "contain" ? "object-contain" : "object-cover",
          )}
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

  if (natural) {
    return (
      <div className={cn("relative w-full overflow-hidden bg-secondary", className)}>
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
              "h-auto w-full object-contain transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0",
            )}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-secondary", className)}
      style={{ aspectRatio }}
    >
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
            "absolute inset-0 h-full w-full transition-opacity duration-300",
            objectFit === "contain" ? "object-contain" : "object-cover",
            loaded ? "opacity-100" : "opacity-0",
          )}
          style={{ objectPosition }}
        />
      ) : null}
    </div>
  );
}
