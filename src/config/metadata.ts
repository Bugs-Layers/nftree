import { Metadata } from "next";

export function constructMetadata({
  title = "Sophist AI - Your learning companion",
  description = "Ergonomic learning experience at the tip of your fingers.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@shahankk42",
    },
    icons,
    metadataBase: new URL("https://sophist-ai.vercel.app/"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
