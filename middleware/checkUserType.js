const checkUserType = (requiredType) => {
  return (req, res, next) => {
    if (req.user.type !== requiredType) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
};

module.exports = checkUserType;
