import { Router } from "express";
import fruitService from "../services/fruit.service.js";
import AppError from "../utils/appError.js";
import { sendSuccess } from "../utils/response.js";
import {
  validateId,
  validatePost,
  validatePut,
  validatePatch,
} from "../middlewares/validateFruit.js";

const router = Router();

// GET /fruits — lista todas as frutas
router.get("/", async (req, res, next) => {
  try {
    const fruits = await fruitService.getAll();
    sendSuccess(res, 200, "Frutas listadas com sucesso.", fruits);
  } catch (err) {
    next(err);
  }
});

// GET /fruits/:id — busca uma fruta pelo id
router.get("/:id", validateId, async (req, res, next) => {
  try {
    const fruit = await fruitService.getById(Number(req.params.id));

    if (!fruit) {
      throw new AppError(`Fruta com id ${req.params.id} não encontrada.`, 404);
    }

    sendSuccess(res, 200, "Fruta encontrada.", fruit);
  } catch (err) {
    next(err);
  }
});

// POST /fruits — cria uma nova fruta
router.post("/", validatePost, async (req, res, next) => {
  try {
    const newFruit = await fruitService.create(req.body.nome);
    sendSuccess(res, 201, "Fruta criada com sucesso.", newFruit);
  } catch (err) {
    next(err);
  }
});

// PATCH /fruits/:id — atualização parcial
router.patch("/:id", validateId, validatePatch, async (req, res, next) => {
  try {
    const updated = await fruitService.updatePatch(Number(req.params.id), {
      nome: req.body.nome,
    });

    if (!updated) {
      throw new AppError(`Fruta com id ${req.params.id} não encontrada.`, 404);
    }

    sendSuccess(res, 200, "Fruta atualizada com sucesso.", updated);
  } catch (err) {
    next(err);
  }
});

// PUT /fruits/:id — substituição completa
router.put("/:id", validateId, validatePut, async (req, res, next) => {
  try {
    const updated = await fruitService.updatePut(
      Number(req.params.id),
      req.body.nome
    );

    if (!updated) {
      throw new AppError(`Fruta com id ${req.params.id} não encontrada.`, 404);
    }

    sendSuccess(res, 200, "Fruta substituída com sucesso.", updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /fruits/:id — remove uma fruta
router.delete("/:id", validateId, async (req, res, next) => {
  try {
    const deleted = await fruitService.remove(Number(req.params.id));

    if (!deleted) {
      throw new AppError(`Fruta com id ${req.params.id} não encontrada.`, 404);
    }

    sendSuccess(res, 200, "Fruta removida com sucesso.", null);
  } catch (err) {
    next(err);
  }
});

export default router;