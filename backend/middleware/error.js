export default (error, req, res, next) => {
  // console.log(error.message, error.status);
  return res
    .status(error.status || 500)
    .send({ message: error.message || "Interna greska na serveru" });
};
