import AppError from "../utils/appError.js";

export function validateId(req, res, next) {
  const { id } = req.params;

  if (!id || !/^\d+$/.test(id)) {
    return next(new AppError("O id deve ser um número inteiro válido.", 400));
  }

  next();
}

export function validatePost(req, res, next) {
  const { nome } = req.body;

  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return next(
      new AppError("O campo 'nome' é obrigatório e não pode estar vazio.", 400)
    );
  }

  req.body.nome = nome.trim();
  next();
}

export function validatePut(req, res, next) {
  const { nome } = req.body;

  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return next(
      new AppError(
        "O PUT exige o recurso completo. O campo 'nome' é obrigatório.",
        400
      )
    );
  }

  req.body.nome = nome.trim();
  next();
}

export function validatePatch(req, res, next) {
  const { nome } = req.body;

  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return next(
      new AppError("O campo 'nome' é obrigatório e não pode estar vazio.", 400)
    );
  }

  req.body.nome = nome.trim();
  next();
}