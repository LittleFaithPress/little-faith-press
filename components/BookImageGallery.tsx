"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function BookImageGallery({
  title,
  cover,
  gallery = [],
}: {
  title: string;
  cover: string;
  gallery?: string[];
}) {
  // Always include the cover first, then gallery, removing duplicates
  const images = useMemo(() => {
    const all = [cover, ...gallery].filter(Boolean);
    return Array.from(new Set(all));
  }, [cover, gallery]);

  const [active, setActive] = useState(images[0] ?? cover);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {/* Main image */}
      <div
        style={{
          width: "100%",
          aspectRatio: "4 / 3",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid var(--stroke)",
          background: "rgba(24,47,92,.05)",
        }}
      >
        <Image
          src={active}
          alt={title}
          width={900}
          height={900}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 ? (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ color: "var(--muted)", fontSize: 16 }}>
            More images
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {images.map((src) => {
              const isActive = src === active;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(src)}
                  aria-label="View image"
                  style={{
                    padding: 0,
                    borderRadius: 14,
                    overflow: "hidden",
                    border: isActive
                      ? "2px solid var(--navy)"
                      : "1px solid var(--stroke)",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      background: "rgba(24,47,92,.05)",
                    }}
                  >
                    <Image
                      src={src}
                      alt={`${title} preview`}
                      width={500}
                      height={500}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}