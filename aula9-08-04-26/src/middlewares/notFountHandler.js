import { sendError } from "../utils/response.js";

export function notFoundHandler(req, res) {
  sendError(res, 404, `Rota '${req.method} ${req.originalUrl}' não encontrada.`);
}