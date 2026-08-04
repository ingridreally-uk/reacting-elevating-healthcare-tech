import { PlayCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface VideoLightboxProps {
  videoSrc: string;
  posterSrc?: string;
  title: string;
  triggerLabel: string;
  triggerClassName?: string;
}

/**
 * On-demand narrated walkthrough. Kept separate from the silent hero loop
 * so the muted autoplay clip and this full-audio tour never share a player.
 */
export function VideoLightbox({
  videoSrc,
  posterSrc,
  title,
  triggerLabel,
  triggerClassName,
}: VideoLightboxProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2 text-[13.5px] font-medium text-foreground/70 underline-offset-4 transition hover:text-foreground hover:underline",
            triggerClassName,
          )}
        >
          <PlayCircle className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
          {triggerLabel}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl gap-3 border-none bg-transparent p-0 shadow-none sm:rounded-2xl">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-black shadow-2xl">
          <video
            src={videoSrc}
            poster={posterSrc}
            controls
            playsInline
            preload="metadata"
            className="aspect-[1640/876] w-full"
          >
            Your browser does not support embedded video.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
}
