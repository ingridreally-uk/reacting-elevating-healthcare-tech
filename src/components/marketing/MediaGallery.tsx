import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductFrame } from "./ProductFrame";
import { MediaViewer } from "./MediaViewer";
import type { MediaItem } from "./content";
import { cn } from "@/lib/utils";
import { elev, iconStroke, layout, radius } from "./design";

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
        "group flex h-full w-full flex-col overflow-hidden border border-border/55 bg-card text-left transition duration-200",
        radius.card,
        elev.product,
        "hover:-translate-y-0.5 hover:border-border hover:shadow-[0_14px_28px_-14px_rgba(11,43,40,0.22)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "flex items-center gap-1.5 border-b border-border/40 bg-[#F6F9F8] px-3",
          layout.chromeH,
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]/70" />
        <span className="ml-2 truncate text-[10px] tracking-wide text-muted-foreground/80">
          app.reacting.io
        </span>
      </div>
      <div className="relative overflow-hidden bg-[#F4F8F7]">
        <MediaViewer
          imageSrc={item.imageSrc}
          videoSrc={item.videoSrc}
          posterSrc={item.posterSrc}
          alt={item.alt}
          objectPosition={item.objectPosition ?? "center"}
          objectFit={item.objectFit ?? "contain"}
          aspectRatio="16 / 10"
          className="transition-transform duration-300 group-hover:scale-[1.01]"
        />
        {item.videoSrc ? (
          <span className="absolute bottom-3 right-3 z-[1] inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground/80 text-background">
            <Play className="h-3.5 w-3.5 fill-current" strokeWidth={iconStroke} />
          </span>
        ) : null}
      </div>
      <div className="flex min-h-[5.25rem] flex-1 flex-col border-t border-border/40 px-3.5 pb-3.5 pt-3">
        <div className="text-[13.5px] font-semibold leading-snug tracking-tight text-foreground">
          {item.title}
        </div>
        {item.description ? (
          <p className="mt-1.5 line-clamp-2 text-[12px] leading-[1.45] text-muted-foreground">
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
  const lightboxSrc = item.lightboxSrc ?? item.imageSrc;

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

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1,
      );

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
            <ProductFrame>
              <MediaViewer
                imageSrc={lightboxSrc}
                videoSrc={item.videoSrc}
                posterSrc={item.posterSrc}
                alt={item.alt}
                natural
                priority
              />
            </ProductFrame>
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

  const row1 = items.slice(0, 3);
  const row2 = items.slice(3, 6);
  const row3 = items.slice(6);

  const renderRow = (row: MediaItem[], offset: number, wide = false) => (
    <div
      className={cn(
        "grid gap-4 lg:gap-5",
        wide
          ? "mx-auto grid-cols-1 sm:grid-cols-2 lg:max-w-[100%]"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {row.map((item, i) => (
        <ScreenshotCard key={item.id} item={item} onOpen={(el) => openAt(offset + i, el)} />
      ))}
    </div>
  );

  return (
    <>
      <div className="hidden space-y-4 md:block">
        {renderRow(row1, 0)}
        {renderRow(row2, 3)}
        {row3.length > 0 ? (
          <div className="mx-auto grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:w-[calc((100%-2.5rem)*2/3+1.25rem)] lg:gap-5">
            {row3.map((item, i) => (
              <ScreenshotCard key={item.id} item={item} onOpen={(el) => openAt(6 + i, el)} />
            ))}
          </div>
        ) : null}
      </div>

      <div className="md:hidden">
        <ScreenshotCard item={items[mobileIndex]} onOpen={(el) => openAt(mobileIndex, el)} />
        <div className="mt-3 flex items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.title}`}
              aria-current={i === mobileIndex ? "true" : undefined}
              onClick={() => setMobileIndex(i)}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition",
                  i === mobileIndex ? "bg-primary" : "bg-border",
                )}
              />
            </button>
          ))}
        </div>
        <div className="mt-1 flex justify-center gap-2">
          <button
            type="button"
            className="min-h-11 rounded-full border border-border px-4 py-2 text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMobileIndex((v) => (v - 1 + items.length) % items.length)}
          >
            Previous
          </button>
          <button
            type="button"
            className="min-h-11 rounded-full border border-border px-4 py-2 text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            setOpenIndex((v) => (v === null ? 0 : (v - 1 + items.length) % items.length))
          }
          onNext={() => setOpenIndex((v) => (v === null ? 0 : (v + 1) % items.length))}
        />
      ) : null}
    </>
  );
}
