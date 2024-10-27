export interface CommentItem {
  id: string;
  name?: string; // Optional, default: "Anonymous"
  email?: string | null; // Optional, default: null
  content: string; // Required
}

export const defaultItem: CommentItem = {
  id: "",
  name: "Anonymous",
  email: null,
  content: "",
};
