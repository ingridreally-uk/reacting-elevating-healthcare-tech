import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserMock } from "./BrowserMock";
import { MediaViewer } from "./MediaViewer";
import type { MediaItem } from "./content";
import { cn } from "@/lib/utils";

export function ScreenshotCard({
  item,
  onOpen,
  className,
}: {
  item: MediaItem;
  onOpen: (trigger: HTMLElement) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => onOpen(e.currentTarget)}
      className={cn(
        "group w-full overflow-hidden rounded-2xl border border-border/70 bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgb(15_23_42/0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <MediaViewer
          imageSrc={item.imageSrc}
          videoSrc={item.videoSrc}
          posterSrc={item.posterSrc}
          alt={item.alt}
          objectPosition="top left"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {item.videoSrc ? (
          <span className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground/80 text-background">
            <Play className="h-3.5 w-3.5 fill-current" />
          </span>
        ) : null}
      </div>
      <div className="px-4 py-3">
        <div className="text-[14px] font-semibold tracking-tight text-foreground">
          {item.title}
        </div>
        {item.description ? (
          <p className="mt-1 text-[12.5px] leading-[1.5] text-muted-foreground">
            {item.description}
          </p>
        ) : null}
      </div>
    </button>
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
  returnFocusTo,
}: {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  returnFocusTo: HTMLElement | null;
}) {
  const item = items[index];
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = returnFocusTo;
    const dialog = dialogRef.current;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialog.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [onClose, onPrev, onNext, returnFocusTo, index]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0B1F1C]/72 p-3 backdrop-blur-sm sm:items-center sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="relative flex max-h-[min(100dvh,100%)] w-full max-w-5xl flex-col"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-3 flex shrink-0 items-center justify-between gap-3 text-white">
            <div className="min-w-0">
              <div id={titleId} className="truncate text-[15px] font-semibold">
                {item.title}
              </div>
              <div className="text-[12px] text-white/70">
                {index + 1} / {items.length}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={onPrev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={onNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
                aria-label="Close gallery"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="min-h-0 overflow-auto">
            <BrowserMock url={`app.reacting.io / ${item.title.toLowerCase()}`}>
              <MediaViewer
                imageSrc={item.imageSrc}
                videoSrc={item.videoSrc}
                posterSrc={item.posterSrc}
                alt={item.alt}
                className="aspect-[16/9]"
                objectPosition="top left"
                priority
              />
            </BrowserMock>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

export function MediaGallery({ items }: { items: MediaItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openAt = (i: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setOpenIndex(i);
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="columns-3 gap-5 space-y-5">
          {items.map((item, i) => (
            <ScreenshotCard
              key={item.id}
              item={item}
              onOpen={(el) => openAt(i, el)}
              className={cn(
                "mb-5 break-inside-avoid",
                i % 3 === 1 ? "mt-8" : i % 3 === 2 ? "mt-4" : "",
              )}
            />
          ))}
        </div>
      </div>

      <div className="md:hidden">
        <ScreenshotCard
          item={items[mobileIndex]}
          onOpen={(el) => openAt(mobileIndex, el)}
        />
        <div className="mt-4 flex items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.title}`}
              onClick={() => setMobileIndex(i)}
              className={cn(
                "h-2 w-2 rounded-full transition",
                i === mobileIndex ? "bg-primary" : "bg-border",
              )}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-2">
          <button
            type="button"
            className="rounded-full border border-border px-3 py-1.5 text-[12px]"
            onClick={() =>
              setMobileIndex((v) => (v - 1 + items.length) % items.length)
            }
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded-full border border-border px-3 py-1.5 text-[12px]"
            onClick={() => setMobileIndex((v) => (v + 1) % items.length)}
          >
            Next
          </button>
        </div>
      </div>

      {openIndex !== null ? (
        <Lightbox
          items={items}
          index={openIndex}
          returnFocusTo={triggerRef.current}
          onClose={() => setOpenIndex(null)}
          onPrev={() =>
            setOpenIndex((v) =>
              v === null ? 0 : (v - 1 + items.length) % items.length,
            )
          }
          onNext={() =>
            setOpenIndex((v) => (v === null ? 0 : (v + 1) % items.length))
          }
        />
      ) : null}
    </>
  );
}
