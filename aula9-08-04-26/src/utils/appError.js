class AppError extends Error {
  /**
   * @param {string} message       - Descrição legível do erro
   * @param {number} statusCode    - Código HTTP (ex: 400, 404, 500)
   * @param {*}      [details]     - Informações extras opcionais
   */
  constructor(message, statusCode, details = null) {
    super(message);
 
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
 
    Error.captureStackTrace(this, this.constructor);
  }
}
 
export default AppError;