import { cn } from "@/lib/utils";

export function BrowserMock({
  url = "app.reacting.io",
  children,
  className,
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_28px_60px_-28px_rgb(15_23_42/0.22),0_2px_6px_-2px_rgb(15_23_42/0.08)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/70 bg-[#F4F8F7] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/75" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/75" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/75" />
        <div className="ml-3 hidden h-6 flex-1 items-center justify-center rounded-md border border-border/70 bg-background px-2.5 text-[11px] text-muted-foreground sm:flex">
          {url}
        </div>
      </div>
      <div className="relative bg-background">{children}</div>
    </div>
  );
}
