export interface CommentItem {
  id: string;
  name?: string; // Optional, default: "Anonymous"
  email?: string | null; // Optional, default: null
  date: number; // Required
  dateEdited: number; // Required
  content: string; // Required
  replyTo?: string | null; // Optional, default: null
}

export const defaultItem: CommentItem = {
  id: "",
  name: "Anonymous",
  email: null,
  date: Date.now(),
  dateEdited: Date.now(),
  content: "",
  replyTo: null,
};
