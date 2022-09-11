const urlLogger = (req, res, next) => {
  console.log(req.originalUrl);
  next();
};

const dateTimeLogger = (req, res, next) => {
  console.log(new Date(Date.now()).toUTCString());
  next();
};

module.exports = {
  urlLogger,
  dateTimeLogger
}