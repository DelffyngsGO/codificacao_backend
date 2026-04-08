import AppError from "../utils/appError.js";
import { sendError } from "../utils/response.js";
 
// O Express reconhece este middleware como tratador de erros por ter 4 parâmetros
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof AppError && err.isOperational) {
    return sendError(res, err.statusCode, err.message, err.details);
  }
 
  // Erro inesperado — não expõe detalhes internos ao cliente
  console.error("[ERRO INTERNO]", err);
  return sendError(res, 500, "Erro interno do servidor.");
}
 