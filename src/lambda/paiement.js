const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = (event, context, callback) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return callback(null, { statusCode: 405, body: "Action non authorisée." });
  }

  const data = JSON.parse(event.body);

  if (!data.token || parseInt(data.amount) < 1) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "Il manque des informations pour effectuer le paiement."
      })
    });
  }

  stripe.charges
    .create({
      amount: parseInt(data.amount),
      currency: "eur",
      description: "Le Bouquin Mordu",
      source: data.token
    })
    .then(({ status }) => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({ status })
      });
    })
    .catch(err => {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          message: `Error: ${err.message}`
        })
      });
    });
};