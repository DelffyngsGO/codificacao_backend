export function sendSuccess(res, statusCode, message, data) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(res, statusCode, message, details = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    details,
  });
}