const errorHandler = (error, req, res, next) => {
  const message = error.message || "api error";
  const status = error.status || 500;
  const data = {
    method: req.method,
    url: req.url,
    error: message,
  };
  return res.status(status).json(data);
};

export default errorHandler;
