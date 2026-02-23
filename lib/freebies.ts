// lib/freebies.ts

export type Freebie = {
  id: string;

  title: string;
  tagline: string;
  age: string;

  // Main card/cover image
  image: string;

  // Optional additional images
  gallery?: string[];

  // Longer page content
  description?: string;
  includes?: string[];

  // CTA behavior
  ctaHref?: string;
  ctaLabel?: string;

  // ✅ Conversion booster (displayed on freebie page)
  conversionNote?: string;
};

export const freebies: Freebie[] = [
  {
    id: "lbst-flashcards",
    title: "Little Bible Stories Flash Card Companion",
    tagline:
      "A printable matching game companion designed to reinforce all Little Bible Stories books.",
    age: "Ages 3–6",

    image: "/books/flash-1.jpg",

    gallery: [
      "/books/flash-2.jpg",
    ],

    description:
      "This free Flash Card Companion includes one matching pair from each Little Bible Stories book, helping children recognize Bible characters while strengthening storytelling and memory skills through play.",

    includes: [
      "16 printable matching cards",
      "One character pair from each Little Bible Stories book",
      "Simple parent prompts to encourage storytelling",
      "Designed for calm, screen-free learning",
    ],

    // ✅ Conversion booster text
    conversionNote:
      "Pairs perfectly with the Little Bible Stories reading, coloring, and activity books.",

    ctaHref: "/#mailing-list",
    ctaLabel: "Get this Freebie",
  },

  /*
  {
    id: "bedtime-routine",
    title: "Calm Bedtime Routine Checklist",
    tagline: "A quick printable to make bedtime smoother tonight.",
    age: "Ages 3–6",
    image: "/books/placeholder.jpg",
    gallery: [],
    description:
      "A simple checklist you can print and use right away to keep bedtime predictable and peaceful.",
    includes: [
      "1-page bedtime routine checklist",
      "Easy steps for ages 3–6",
      "Print-and-go format",
    ],
    conversionNote:
      "Designed to complement Little Faith Press bedtime stories and calm evening routines.",
    ctaHref: "/#mailing-list",
    ctaLabel: "Get this Freebie",
  },
  */
];