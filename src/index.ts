import { serve } from "@hono/node-server";
import { Hono } from "hono";
import {
  getAllCommentsByDomainHandler,
  getAllCommentsByPathHandler,
  getComment,
} from "./handlers/getComments.js";
import {
  postCommentHandler,
  deleteCommentHandler,
  updateCommentHandler,
} from "./handlers/postComment.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Server is running.");
});

app.get("/comments", getAllCommentsByDomainHandler);
app.get("/comments/:path", getAllCommentsByPathHandler);
app.get("/comments/:path/:id", getComment);
app.post("/comment/:path", postCommentHandler);
app.put("/comment/:path/:id", updateCommentHandler);
app.delete("/comment/:path/:id", deleteCommentHandler);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
