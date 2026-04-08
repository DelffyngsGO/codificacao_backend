import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import AppError from "../utils/appError.js";

// Em ES Modules não existe __dirname — precisa ser montado manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, "../data/fruits.json");

// ─── Leitura e escrita base ──────────────────────────────────────────────────

async function readData() {
  try {
    const content = await fs.readFile(DATA_PATH, "utf-8");

    if (!content.trim()) return [];

    return JSON.parse(content);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.writeFile(DATA_PATH, "[]", "utf-8");
      return [];
    }

    if (err instanceof SyntaxError) {
      throw new AppError("O arquivo de dados está corrompido.", 500);
    }

    throw new AppError("Falha ao ler o arquivo de dados.", 500);
  }
}

async function writeData(data) {
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    throw new AppError("Falha ao salvar os dados.", 500);
  }
}

// ─── Métodos do service ──────────────────────────────────────────────────────

async function getAll() {
  return readData();
}

async function getById(id) {
  const fruits = await readData();
  return fruits.find((f) => f.id === id) ?? null;
}

async function create(nome) {
  const fruits = await readData();

  const newId = fruits.length > 0 ? Math.max(...fruits.map((f) => f.id)) + 1 : 1;
  const newFruit = { id: newId, nome };

  fruits.push(newFruit);
  await writeData(fruits);

  return newFruit;
}

async function updatePatch(id, fields) {
  const fruits = await readData();
  const index = fruits.findIndex((f) => f.id === id);

  if (index === -1) return null;

  fruits[index] = { ...fruits[index], ...fields };
  await writeData(fruits);

  return fruits[index];
}

async function updatePut(id, nome) {
  const fruits = await readData();
  const index = fruits.findIndex((f) => f.id === id);

  if (index === -1) return null;

  fruits[index] = { id, nome };
  await writeData(fruits);

  return fruits[index];
}

async function remove(id) {
  const fruits = await readData();
  const index = fruits.findIndex((f) => f.id === id);

  if (index === -1) return false;

  fruits.splice(index, 1);
  await writeData(fruits);

  return true;
}

export default { getAll, getById, create, updatePatch, updatePut, remove };