export const errorHandler = (error, req, res, next) => {
  //set default status code and message
  //error.statuscode from app.use(error)
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server";
  res.status(statusCode).json({
    status: "error",
    message,
  });
};
