import type { Handler } from "hono";
import { create, remove, update } from "../utils/db.js";

const postCommentHandler: Handler = async (c) => {
  const domain = c.req.header("X-Domain");
  const path = c.req.header("X-Path");
  const body = await c.req.formData();

  if (!domain || !path) {
    return c.json({ error: "Domain and Path are required" }, 400);
  }

  if (!body.has("content")) {
    return c.json({ error: "Comment is required" }, 400);
  }

  const parsedBody = {
    content: body.get("content") as string,
    name: (body.get("name") ?? "Anonymous") as string,
    email: (body.get("email") ?? null) as string | null,
    replyTo: (body.get("replyTo") ?? null) as string | null,
  };

  const comment = create(domain, path, parsedBody);

  return c.json(comment);
};

const updateCommentHandler: Handler = async (c) => {
  const domain = c.req.header("X-Domain");
  const path = c.req.header("X-Path");
  const id = c.req.header("X-Id");
  const body = await c.req.formData();

  if (!domain || !path || !id) {
    return c.json({ error: "Domain, Path, and ID are required" }, 400);
  }

  if (!body.has("content")) {
    return c.json({ error: "Comment is required" }, 400);
  }

  const parsedBody = {
    content: body.get("content") as string,
    name: (body.get("name") ?? "Anonymous") as string,
    email: (body.get("email") ?? null) as string | null,
    replyTo: (body.get("replyTo") ?? null) as string | null,
  };

  const comment = update(domain, path, id, parsedBody);

  return c.json(comment);
};

const deleteCommentHandler: Handler = (c) => {
  const domain = c.req.header("X-Domain");
  const path = c.req.header("X-Path");
  const id = c.req.header("X-Id");

  if (!domain || !path || !id) {
    return c.json({ error: "Domain, Path, and ID are required" }, 400);
  }

  const comment = remove(domain, path, id);

  return c.json(comment);
};

export { postCommentHandler, updateCommentHandler, deleteCommentHandler };
