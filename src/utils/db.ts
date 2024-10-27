import fs from "fs";
import path from "path";
import { type CommentItem as Item, defaultItem } from "../spec/comment.js";
import { createId } from "@paralleldrive/cuid2";

const ensureDirExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const getFilePath = (domain: string, reqPath: string) => {
  const sanitizedDomain = domain.replace(/[^a-z0-9]/gi, "_").toLowerCase(); // Sanitize domain
  const sanitizedPath = reqPath.replace(/\//g, "_"); // Sanitize path
  return path.join(
    __dirname,
    "..",
    "..",
    "data",
    sanitizedDomain,
    `${sanitizedPath}.json`
  );
};

const readData = (domain: string, reqPath: string): Item[] => {
  const filePath = getFilePath(domain, reqPath);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const writeData = (domain: string, reqPath: string, data: Item[]) => {
  const filePath = getFilePath(domain, reqPath);
  ensureDirExists(path.dirname(filePath)); // Ensure directory exists
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const getAllByPath = (domain: string, reqPath: string): Item[] =>
  readData(domain, reqPath);

const getAllByDomain = (domain: string): Item[] => {
  const dirPath = path.join(__dirname, "..", "..", "data", domain);
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs.readdirSync(dirPath).reduce((acc, file) => {
    const data = readData(domain, file.replace(".json", ""));
    return [...acc, ...data];
  }, [] as Item[]);
};

const getById = (
  domain: string,
  reqPath: string,
  id: string
): Item | undefined => readData(domain, reqPath).find((item) => item.id === id);

const create = (domain: string, reqPath: string, item: Partial<Item>) => {
  const data = readData(domain, reqPath);
  const newItem: Item = {
    ...defaultItem,
    id: createId(),
    ...item,
  };
  data.push(newItem);
  writeData(domain, reqPath, data);
};

const update = (
  domain: string,
  reqPath: string,
  id: string,
  updatedItem: Partial<Item>
) => {
  const data = readData(domain, reqPath);
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    writeData(domain, reqPath, data);
  }
};

const remove = (domain: string, reqPath: string, id: string) => {
  const data = readData(domain, reqPath);
  const updatedData = data.filter((item) => item.id !== id);
  writeData(domain, reqPath, updatedData);
};

export { getAllByPath, getAllByDomain, getById, create, update, remove };
