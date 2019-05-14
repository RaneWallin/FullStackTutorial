module.exports = (req, res, next) => {
  const credits = req.user.credits;

  if (credits < 1)
    return res.status(403).json({
      error: "You do not have enough survey credits to perform this action."
    });

  next();
};
