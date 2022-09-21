import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import Stripe from "stripe";

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

const port = 3000;
const PUBLISHABLE_KEY =
  "pk_test_51Lc8EsBRfoI5EEBCGtH8PMhbH3wEW7mnG1d4jRsn3DZuQtybHT6Wk7bhRWM9cSW4XliTr1h7VMQsQ42Hgg3htB4600u992LIkc";
const SECRET_KEY =
  "sk_test_51Lc8EsBRfoI5EEBCBZCWUJMuBDJDNMIzSoxSQ4QWxFo7e6vCuwkl9BPEIdiXLwOId7rudtBZr47iX6VokyFkM7AM00iM2OYoBr";
const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-08-01" });

app.get("/", (req, res) => {
  res.end("Hello World!");
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    var _amount = req.query.amount;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: _amount * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app run ${port}`);
});
