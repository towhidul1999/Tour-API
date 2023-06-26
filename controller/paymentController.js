const stripe = require("stripe")(process.env.SECRET_KEY);

async function payment(req, res) {
  try {
    const { amount, currency, source } = req.body;

    // Validate the payment information
    if (!amount || !currency || !source) {
      throw new Error("Missing payment information");
    }

    // Submit the payment information to the payment gateway
    const charge = await stripe.charges.create({
      amount,
      currency,
      source,
      description: "Example charge",
    });

    res.send({ message: "Charge successful!" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

module.exports = {
  payment,
};
