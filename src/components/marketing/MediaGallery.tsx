import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ProductFrame } from "./ProductFrame";
import { MediaViewer } from "./MediaViewer";
import type { MediaItem } from "./content";
import { cn } from "@/lib/utils";
import { layout } from "./design";

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
      }
      if (e.key === "Tab" && dialogRef.current) {
        const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose, onNext, onPrev, returnFocusTo, index]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={dialogRef}
          className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-[#0B1F2A] text-white shadow-2xl"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <div id={titleId} className="truncate text-[14px] font-semibold">
                {item.title}
              </div>
              {item.description ? (
                <p className="mt-0.5 truncate text-[12px] text-white/65">{item.description}</p>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={onPrev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={onNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Close gallery"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="min-h-0 overflow-auto p-3 sm:p-4">
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

function pathLabel(title: string) {
  if (title === "Savings & Reporting") return "savings & usage";
  if (title === "RFQ Comparison") return "rfq";
  if (title === "Purchase Orders") return "purchase orders";
  if (title === "Expiry Tracking") return "expiring stock";
  if (title === "Low Stock") return "low stock";
  return title.toLowerCase();
}

/**
 * Interactive workflow walkthrough — screenshots carry the explanation.
 * Reserved media slot above the preview can host a product video later.
 */
export function MediaGallery({ items }: { items: MediaItem[] }) {
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const item = items[active] ?? items[0];
  const listId = useId();

  if (!item) return null;

  const openLightbox = (i: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setOpenIndex(i);
  };

  return (
    <>
      <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p id={listId} className="sr-only">
            Product workflow steps
          </p>
          <ol
            className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0"
            role="tablist"
            aria-labelledby={listId}
            onKeyDown={(e) => {
              if (
                e.key !== "ArrowDown" &&
                e.key !== "ArrowUp" &&
                e.key !== "ArrowRight" &&
                e.key !== "ArrowLeft" &&
                e.key !== "Home" &&
                e.key !== "End"
              ) {
                return;
              }
              e.preventDefault();
              let next = active;
              if (e.key === "Home") next = 0;
              else if (e.key === "End") next = items.length - 1;
              else if (e.key === "ArrowDown" || e.key === "ArrowRight")
                next = (active + 1) % items.length;
              else next = (active - 1 + items.length) % items.length;
              setActive(next);
              requestAnimationFrame(() => {
                document.getElementById(`tour-tab-${items[next]?.id}`)?.focus();
              });
            }}
          >
            {items.map((entry, i) => {
              const selected = i === active;
              return (
                <li key={entry.id} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`tour-panel-${entry.id}`}
                    id={`tour-tab-${entry.id}`}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      selected
                        ? "border-[oklch(0.66_0.11_210)] bg-white shadow-[0_1px_2px_rgba(11,23,48,0.04)]"
                        : "border-transparent bg-transparent hover:bg-white/70",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums",
                        selected
                          ? "bg-[oklch(0.4_0.08_260)] text-white"
                          : "bg-[oklch(0.94_0.02_260)] text-[oklch(0.4_0.08_260)]",
                      )}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13.5px] font-semibold tracking-tight text-foreground">
                        {entry.title}
                      </span>
                      {entry.description ? (
                        <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">
                          {entry.description}
                        </span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <div role="tabpanel" id={`tour-panel-${item.id}`} aria-labelledby={`tour-tab-${item.id}`}>
            <motion.div
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
            >
              <button
                type="button"
                className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={(e) => openLightbox(active, e.currentTarget)}
                aria-label={`Open larger view of ${item.title}`}
              >
                <ProductFrame label={`app.reacting.io / ${pathLabel(item.title)}`}>
                  <div className="aspect-[16/10] w-full">
                    <MediaViewer
                      imageSrc={item.imageSrc}
                      alt={item.alt}
                      objectPosition={item.objectPosition ?? "center"}
                      objectFit={item.objectFit ?? "contain"}
                      aspectRatio="16 / 10"
                      priority={active === 0}
                      className="transition-opacity duration-200 group-hover:opacity-[0.98]"
                    />
                  </div>
                </ProductFrame>
              </button>
              <p className="mt-3 text-center text-[12.5px] text-muted-foreground">
                Step {active + 1} of {items.length} — follow the workflow through the practice.
              </p>
            </motion.div>
          </div>
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

/** @deprecated Prefer MediaGallery; kept for any external imports. */
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
        "group flex w-full flex-col overflow-hidden rounded-2xl border border-border/55 bg-card text-left",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1.5 border-b border-border/40 bg-[#F6F9F8] px-3",
          layout.chromeH,
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]/70" />
      </div>
      <MediaViewer
        imageSrc={item.imageSrc}
        alt={item.alt}
        aspectRatio="16 / 10"
        objectFit="contain"
      />
      <div className="border-t border-border/40 px-3.5 py-3">
        <div className="text-[13.5px] font-semibold">{item.title}</div>
      </div>
    </button>
  );
}
