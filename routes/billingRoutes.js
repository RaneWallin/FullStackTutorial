const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "payment for email credits",
      source: req.body.id
    });

    if (charge.status != "succeeded")
      return res.status(402).json({ error: "Payment failed." });

    try {
      req.user.credits += 5;
      const user = await req.user.save();

      return res.status(202).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};
