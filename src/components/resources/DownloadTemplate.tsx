import { Download } from "lucide-react";
import { btn, iconStroke } from "@/components/marketing/design";
import { cn } from "@/lib/utils";
import { WORKBOOK_FILENAME, WORKBOOK_HREF } from "./stocktake";

export function DownloadTemplate({
  className,
  align = "start",
}: {
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <a
        href={WORKBOOK_HREF}
        download={WORKBOOK_FILENAME}
        className={cn(btn.base, btn.primary, "min-h-11 w-full sm:w-auto")}
      >
        Download the free Excel template
        <Download className="h-4 w-4" strokeWidth={iconStroke} />
      </a>
      <p className="mt-2.5 text-[12.5px] leading-snug text-foreground/55">
        Free · Excel .xlsx · No sign-up required
      </p>
    </div>
  );
}
