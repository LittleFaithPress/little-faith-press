// lib/books.ts

// Single source of truth for series names (prevents typos + enables reuse)
export const BOOK_SERIES = [
  "Little Bible Stories",
  "Daddy & Me",
  "Pappa en Ek",
  "Seasonal Coloring Books",
] as const;

export type BookSeries = (typeof BOOK_SERIES)[number];

export type BuyLinks = {
  amazon?: string;
  kindle?: string;
  etsy?: string;
};

export type Book = {
  id: string;
  series: BookSeries;

  title: string;
  tagline: string;
  age: string;

  // Card image
  image: string;

  // Multiple purchase options (for the book detail page/buttons)
  buyLinks?: BuyLinks;

  gallery?: string[]; // ✅ add

  // ✅ NEW (OPTION 2): mark which books show on Home Featured section
  // Optional so it will NOT affect your existing Books page behavior.
  featured?: boolean;
};

export const books: Book[] = [
  {
    id: "creation",
    series: "Little Bible Stories",
    title: "Little Bible Stories: Creation",
    tagline: "A gentle introduction to creation featuring a simple Bible story, coloring pages, and activities designed for ages 3–6.",
    age: "Ages 3–6",
    image: "/books/creation-1.jpg",
    gallery: [
      "/books/creation-2.jpg",
      "/books/creation-3.jpg",
      "/books/creation-4.jpg",
      "/books/creation-5.jpg",
    ],
    buyLinks: {
      amazon: "https://www.amazon.com/dp/B0GJ6RNWVN",
      kindle: "",
      etsy: "",
    },
    featured: true,
  },
  {
    id: "noah",
    series: "Little Bible Stories",
    title: "Little Bible Stories: Noah's Ark",
    tagline: "A child-friendly retelling of Noah’s Ark paired with engaging coloring pages and simple activities that reinforce the story.",
    age: "Ages 3–6",
    image: "/books/noah-1.jpg",
    gallery: [
      "/books/noah-2.jpg",
      "/books/noah-3.jpg",
      "/books/noah-4.jpg",
      "/books/noah-5.jpg",
    ],
    buyLinks: {
      amazon: "https://www.amazon.com/dp/B0GJFFLQMT",
      kindle: "",
      // ✅ tiny safe fix: add https:// so the link works everywhere
      etsy:
        "https://www.etsy.com/listing/4452238538/noahs-ark-coloring-pages-printable-for",
    },
  },
  {
    id: "moses",
    series: "Little Bible Stories",
    title: "Little Bible Stories: Moses & the Exodus",
    tagline: "An easy-to-follow story of Moses combined with coloring and activity pages that help children explore faith through hands-on learning.",
    age: "Ages 3–6",
    image: "/books/moses-1.jpg",
    gallery: [
      "/books/moses-2.jpg",
      "/books/moses-3.jpg",
      "/books/moses-4.jpg",
      "/books/moses-5.jpg",
    ],
    buyLinks: {
      amazon: "https://www.amazon.com/dp/B0GJSQBWWV",
      kindle: "",
      etsy:
        "https://www.etsy.com/listing/4443530581/moses-bible-coloring-pages-printable-for",
    },
  },
  {
    id: "david",
    series: "Little Bible Stories",
    title: "Little Bible Stories: David & Goliath",
    tagline: "A simple story of courage and faith supported by coloring and activity pages designed for young learners.",
    age: "Ages 3–6",
    image: "/books/david-1.jpg",
    gallery: [
      "/books/david-2.jpg",
      "/books/david-3.jpg",
      "/books/david-4.jpg",
      "/books/david-5.jpg",
    ],
    buyLinks: {
      amazon: "https://www.amazon.com/dp/B0GJFGQL94",
      kindle: "",
      etsy: "",
    },
    featured: true,
  },
  {
    id: "daniel",
    series: "Little Bible Stories",
    title: "Little Bible Stories: Daniel and the Lion's Den",
    tagline: "A reassuring Bible story brought to life through storytelling, coloring, and interactive activity pages.",
    age: "Ages 3–6",
    image: "/books/daniel-1.jpg",
    gallery: [
      "/books/daniel-2.jpg",
      "/books/daniel-3.jpg",
      "/books/daniel-4.jpg",
      "/books/daniel-5.jpg",
    ],
    buyLinks: {
      amazon: "https://www.amazon.com/dp/B0GJT3K1HJ",
      kindle: "",
      etsy: "",
    },
  },
  {
    id: "jonah",
    series: "Little Bible Stories",
    title: "Little Bible Stories: Jonah and the Fish",
    tagline: "A gentle retelling of Jonah’s journey with coloring and activity pages that help children engage with the story.",
    age: "Ages 3–6",
    image: "/books/jonah-1.jpg",
    gallery: [
      "/books/jonah-2.jpg",
      "/books/jonah-3.jpg",
      "/books/jonah-4.jpg",
      "/books/jonah-5.jpg",
    ],
    buyLinks: {
      amazon: "https://www.amazon.com/dp/B0GJSWF5WS",
      kindle: "",
      etsy: "",
    },
  },
  {
    id: "nativity",
    series: "Little Bible Stories",
    title: "Little Bible Stories: The Birth of Jesus",
    tagline: "A calm introduction to the Nativity story featuring storytelling, coloring pages, and faith-based activities for young children.",
    age: "Ages 3–6",
    image: "/books/nativity-1.jpg",
    gallery: [
      "/books/nativity-2.jpg",
      "/books/nativity-3.jpg",
      "/books/nativity-4.jpg",
      "/books/nativity-5.jpg",
    ],
    buyLinks: {
      amazon: "https://www.amazon.com/dp/B0GJSQBWZ2",
      kindle: "",
      etsy:
        "https://www.etsy.com/listing/4443544390/birth-of-jesus-coloring-pages-for-kids",
    },
  },
  {
    id: "easter",
    series: "Little Bible Stories",
    title: "Little Bible Stories: Easter: Jesus is Alive",
    tagline: "A simple Easter story paired with coloring and activity pages that help children understand the message of hope and celebration.",
    age: "Ages 3–6",
    image: "/books/easter-1.jpg",
    gallery: [
      "/books/easter-2.jpg",
      "/books/easter-3.jpg",
      "/books/easter-4.jpg",
      "/books/easter-5.jpg",
    ],
    buyLinks: {
      amazon: "https://www.amazon.com/dp/B0GJSR369G",
      kindle: "",
      etsy:
        "https://www.etsy.com/listing/4443527411/christian-easter-coloring-pages-for",
    },
  },

  {
    id: "park",
    series: "Daddy & Me",
    title: "Daddy & Me Go to the Park",
    tagline: "A fun-filled park adventure that celebrates everyday bonding moments between parent and child.",
    age: "Ages 3–6",
    image: "/books/park-1.jpg",
    gallery: [
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
    ],
    buyLinks: {
      amazon: "https://www.amazon.com/dp/B0GLNSJDZZ",
      kindle: "https://www.amazon.com/dp/B0GKYSB154",
      etsy: "",
    },
    featured: true,
  },
  {
    id: "zoo",
    series: "Daddy & Me",
    title: "Daddy & Me Go to the Zoo",
    tagline: "An exciting zoo visit that encourages curiosity, connection, and shared family experiences.",
    age: "Ages 3–6",
    image: "/books/zoo-1.jpg",
    gallery: [
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
    ],
    buyLinks: {
      amazon: "https://www.amazon.com/dp/B0GLNXWZJR",
      kindle: "https://www.amazon.com/dp/B0GKY8YF3Y",
      etsy: "",
    },
  },
  {
    id: "doctor",
    series: "Daddy & Me",
    title: "Daddy & Me Go to the Doctor",
    tagline: "A reassuring story that helps children feel confident and prepared for their first doctor visit.",
    age: "Ages 3–6",
    image: "/books/doctor-1.jpg",
    gallery: [
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
    ],
    buyLinks: {
      amazon: "https://www.amazon.com/dp/B0GLNTGMFX",
      kindle: "https://www.amazon.com/dp/B0GKY1GHKG",
      etsy: "",
    },
    featured: true,
  },
  {
    id: "dentist",
    series: "Daddy & Me",
    title: "Daddy & Me Go to the Dentist",
    tagline: "A comforting read-aloud that helps ease dental visit worries through familiarity and gentle storytelling.",
    age: "Ages 3–6",
    image: "/books/dentist-1.jpg",
    gallery: [
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
    ],
    buyLinks: {
      amazon: "https://www.amazon.com/dp/B0GLNBFB9D",
      kindle: "https://www.amazon.com/dp/B0GKYJ82FN",
      etsy: "",
    },
  },
  {
    id: "goodnight",
    series: "Daddy & Me",
    title: "Daddy & Me Say Goodnight",
    tagline: "A calm bedtime story designed to support peaceful nighttime routines and meaningful parent-child connection.",
    age: "Ouderdom 3–6",
    image: "/books/goodnight-1.jpg",
    gallery: [
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
    ],
    buyLinks: {
      amazon: "https://www.amazon.com/dp/B0GKPK4PRR",
      kindle: "https://www.amazon.com/dp/B0GLNPQ5H4",
      etsy: "",
    },
  },

  {
    id: "parkie",
    series: "Pappa en Ek",
    title: "Pappa en Ek Gaan Parkie Toe",
    tagline: "’n Warm en eenvoudige storie oor alledaagse pa-en-kind avonture by die park.",
    age: "Ouderdom 3–6",
    image: "/books/parkie-1.jpg",
    gallery: [
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
    ],
    buyLinks: {
      amazon: "",
      kindle: "https://www.amazon.com/dp/B0GL1L9W68",
      etsy: "",
    },
  },
  {
    id: "dieretuin",
    series: "Pappa en Ek",
    title: "Pappa en Ek Gaan Dieretuin Toe",
    tagline: "’n Pretvolle dieretuin-avontuur wat nuuskierigheid en gesinstyd vier.",
    age: "Ouderdom 3–6",
    image: "/books/dieretuin-1.jpg",
    gallery: [
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
    ],
    buyLinks: {
      amazon: "",
      kindle: "https://www.amazon.com/dp/B0GL1HR588",
      etsy: "",
    },
  },
  {
    id: "dokter",
    series: "Pappa en Ek",
    title: "Pappa en Ek Gaan Dokter Toe",
    tagline: "’n Gerusstellende storie wat kinders help voorberei vir hul eerste dokterbesoek.",
    age: "Ouderdom 3–6",
    image: "/books/dokter-1.jpg",
    gallery: [
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
    ],
    buyLinks: {
      amazon: "",
      kindle: "https://www.amazon.com/dp/B0GL1DRJQ9",
      etsy: "",
    },
  },
  {
    id: "tandarts",
    series: "Pappa en Ek",
    title: "Pappa en Ek Gaan Tandarts Toe",
    tagline: "’n Sagte storie wat tandartsbesoeke minder spannend en meer verstaanbaar maak.",
    age: "Ouderdom 3–6",
    image: "/books/tandarts-1.jpg",
    gallery: [
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
    ],
    buyLinks: {
      amazon: "",
      kindle: "https://www.amazon.com/dp/B0GKZJZX47",
      etsy: "",
    },
  },
  {
    id: "goeienag",
    series: "Pappa en Ek",
    title: "Pappa en Ek Sê Goeienag",
    tagline: "’n Rustige slaaptydstorie wat help om kalm aandroetines te bou.",
    age: "Ouderdom 3–6",
    image: "/books/goeienag-1.jpg",
    gallery: [
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
    ],
    buyLinks: {
      amazon: "",
      kindle: "https://www.amazon.com/dp/B0GJZ72Y27",
      etsy: "",
    },
  },

  {
    id: "lbscb",
    series: "Seasonal Coloring Books",
    title: "Little Bible Stories Coloring Book | Ages 3–6",
    tagline:
      "Easy Bible coloring pages with gentle faith messages little ones can enjoy.",
    age: "Ages 3–6",
    image: "/books/placeholder.jpg",
    gallery: [
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
    ],
    buyLinks: {
      amazon: "https://www.amazon.com/dp/B0GFG8ZCTB",
      kindle: "",
      etsy: "https://www.etsy.com/listing/4436260691/little-bible-stories-coloring-book-o",
    },
  },
  {
    id: "lbscbv2",
    series: "Seasonal Coloring Books",
    title: "Little Bible Stories Coloring Book | Ages 3–6 Volume 2",
    tagline:
      "A second collection of calm Bible coloring pages designed for young children.",
    age: "Ages 3–6",
    image: "/books/placeholder.jpg",
    gallery: [
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
    ],
    buyLinks: {
      amazon: "https://amazon.com/xxxx",
      kindle: "",
      etsy: "https://etsy.com/listing/xxxx",
    },
  },
  {
    id: "valentines",
    series: "Seasonal Coloring Books",
    title: "Valentine’s Day Coloring Book for Toddlers | Printable Ages 3–6",
    tagline: "Simple Valentine-themed coloring pages perfect for toddlers enjoying creative seasonal fun.",
    age: "Ages 3–6",
    image: "/books/placeholder.jpg",
    gallery: [
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
      "/books/placeholder.jpg",
    ],
    buyLinks: {
      amazon: "https://amazon.com/xxxx",
      kindle: "https://amazon.com/kindlexxxx",
      etsy: "https://etsy.com/listing/xxxx",
    },
  },
  {
    id: "eastercoloring",
    series: "Seasonal Coloring Books",
    title: "Easter Coloring Book for Toddlers | Printable Ages 3–6",
    tagline: "A joyful Easter-themed coloring book designed for calm holiday activities and early creativity.",
    age: "Ages 3–6",
    image: "/books/eastercb-1.jpg",
    gallery: [
      "/books/eastercb-2.jpg",
      "/books/eastercb-3.jpg",
      "/books/eastercb-4.jpg",
      "/books/eastercb-5.jpg",
    ],
    buyLinks: {
      amazon: "https://amazon.com/xxxx",
      kindle: "https://amazon.com/kindlexxxx",
      etsy: "https://etsy.com/listing/xxxx",
    },
  },
];