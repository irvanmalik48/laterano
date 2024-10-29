import type { Handler } from "hono";
import { getAllByDomain, getAllByPath, getById } from "../utils/db.js";

const getAllCommentsByDomainHandler: Handler = (c) => {
  const domain = c.req.header("X-Domain");

  if (!domain) {
    return c.json({ error: "Domain is required" }, 400);
  }

  const comments = getAllByDomain(domain);

  return c.json(comments);
};

const getAllCommentsByPathHandler: Handler = (c) => {
  const domain = c.req.header("X-Domain");
  const path = c.req.param("path");

  if (!domain || !path) {
    return c.json({ error: "Domain and Path are required" }, 400);
  }

  const comments = getAllByPath(domain, path);

  return c.json(comments);
};

const getComment: Handler = (c) => {
  const domain = c.req.header("X-Domain");
  const path = c.req.param("path");
  const id = c.req.param("id");

  if (!domain || !path || !id) {
    return c.json({ error: "Domain, Path, and ID are required" }, 400);
  }

  const comment = getById(domain, path, id);

  if (!comment) {
    return c.json({ error: "Comment not found" }, 404);
  }

  return c.json(comment);
};

export {
  getAllCommentsByDomainHandler,
  getAllCommentsByPathHandler,
  getComment,
};
