type Props = {
  size?: number;
  className?: string;
  title?: string;
};

/**
 * Reacting brand symbol.
 * Rounded midnight-navy square with a stylised "R" and a small teal
 * accent dot — used across nav, footer, favicon and product surfaces.
 */
export function ReactingMark({ size = 24, className = "", title = "Reacting" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#0B1730" />
      <path
        d="M10 8.75h7.35c2.9 0 4.9 1.85 4.9 4.55 0 2.05-1.2 3.6-3.1 4.25l3.35 5.7h-3.2l-3.05-5.35H12.8v5.35H10V8.75Zm7 6.9c1.55 0 2.55-.9 2.55-2.3 0-1.4-1-2.25-2.55-2.25H12.8v4.55H17Z"
        fill="#FFFFFF"
      />
      <circle cx="24.5" cy="9.5" r="2" fill="#1FA7B8" />
    </svg>
  );
}
