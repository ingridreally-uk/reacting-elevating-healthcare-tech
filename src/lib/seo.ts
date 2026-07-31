import { SITE_ORIGIN } from "./site-url";

const DEFAULT_OG_IMAGE = "/og-reacting-dental-assist.png";

/**
 * Builds a complete, consistent set of meta tags (title, description,
 * canonical-friendly OG, Twitter card) for a route. Keeps every page fully
 * discoverable by search engines and AI answer engines without repeating
 * the same eight tags by hand in every route file.
 */
export function pageMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}) {
  const url = `${SITE_ORIGIN}${path}`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_ORIGIN}${image}`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "Reacting" },
      { property: "og:image", content: absoluteImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt ?? title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: absoluteImage },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
