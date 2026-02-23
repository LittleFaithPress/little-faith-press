// lib/adminLinks.ts

export type AdminIcon =
  | "link"
  | "mail"
  | "folder"
  | "instagram"
  | "facebook"
  | "users"
  | "pinterest"
  | "tiktok"
  | "amazon"
  | "book"
  | "store"
  | "globe"
  | "layout"
  | "chart";

export type AdminLink = {
  label: string;
  href: string;
  icon?: AdminIcon; // ✅ new
  note?: string;
};

export type AdminLinkGroup = {
  title: string;
  links: AdminLink[];
};

export const adminLinkGroups: AdminLinkGroup[] = [
  {
    title: "Core",
    links: [
      { label: "Linktree", href: "https://linktr.ee/admin/insights", icon: "link" },
      { label: "Kit Dashboard", href: "https://app.kit.com/subscribers?state=all", icon: "mail" },
      { label: "Google Drive (Freebies)", href: "https://drive.google.com/drive/folders/1ZH0bBapjLjMaI1-y5GJlyPtjxYbIQclp", icon: "folder" },
      { label: "Canva", href: "https://www.canva.com/", icon: "folder"  },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "https://instagram.com/YOURHANDLE", icon: "instagram" },
      { label: "Facebook Page", href: "https://www.facebook.com/LittleFaithPress/", icon: "facebook" },
      { label: "Facebook Group", href: "https://www.facebook.com/LittleFaithPress/groups", icon: "users" },
      { label: "Pinterest", href: "https://www.pinterest.com/littlefaithpress/", icon: "pinterest" },
    ],
  },
  {
    title: "Stores",
    links: [
      { label: "Amazon Author Central", href: "https://author.amazon.com/home", icon: "amazon" },
      { label: "KDP Dashboard", href: "https://kdp.amazon.com/en_US/bookshelf", icon: "book" },
      { label: "Etsy Shop Manager", href: "https://www.etsy.com/your/shops/me/dashboard?ref=seller-platform-mcnav", icon: "store" },
    ],
  },
];