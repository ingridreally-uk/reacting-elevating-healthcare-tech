import { useId } from "react";

type Props = {
  size?: number;
  className?: string;
  title?: string;
};

/** Approved Reacting brand mark: abstract R with midnight navy/blue/teal gradient. */
export function ReactingMark({ size = 32, className = "", title = "Reacting" }: Props) {
  const uid = useId().replace(/:/g, "");
  const topId = `${uid}-top`;
  const cutId = `${uid}-cut`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <linearGradient id={topId} x1="12" y1="12" x2="82" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#06153B" />
          <stop offset="0.55" stopColor="#0B1730" />
          <stop offset="1" stopColor="#123A78" />
        </linearGradient>
        <linearGradient id={cutId} x1="20" y1="70" x2="74" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1FA7B8" />
          <stop offset="0.5" stopColor="#0B75D1" />
          <stop offset="1" stopColor="#071640" />
        </linearGradient>
      </defs>
      <path
        d="M19 21c0-6.6 5.4-12 12-12h31c18.2 0 31 12.1 31 30.1 0 18.1-12.8 30.2-31 30.2H49L19 39V21Z"
        fill={`url(#${topId})`}
      />
      <path
        d="M19 51.5c0-6.6 5.4-12 12-12h14.3l31.1 31.2c3.7 3.7 1.1 10-4.2 10H31c-6.6 0-12-5.4-12-12V51.5Z"
        fill={`url(#${cutId})`}
      />
      <path d="M30 40h18.5L68 60H49.5L30 40Z" fill="#FFFFFF" />
    </svg>
  );
}
