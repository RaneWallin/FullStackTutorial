const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = app => {
  app.post("/api/stripe", async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "payment for email credits",
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.status(202).json(user);
  });
};
