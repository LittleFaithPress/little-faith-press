export type DraftStatus = "Idea" | "Ready" | "Sent";
export type DraftType =
  | "Welcome"
  | "Freebie Delivery"
  | "New Book"
  | "Promo"
  | "Seasonal"
  | "Other";

export type EmailDraft = {
  id: string;
  title: string;
  type: DraftType;
  status: DraftStatus;
  subject: string;
  body: string;
  updatedAt: string; // ISO string
};

export const DRAFT_TYPES: DraftType[] = [
  "Welcome",
  "Freebie Delivery",
  "New Book",
  "Promo",
  "Seasonal",
  "Other",
];

export const DRAFT_STATUSES: DraftStatus[] = ["Idea", "Ready", "Sent"];