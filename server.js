const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

//if we are not in production let us access secret key in .env file. it adds whatever we have in .env file to process.env
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
//if there is port value on the process environment we are gonna use that otherwise 5000,
//so server is going to be on a different port than our local host, localhost will be on 3000 and server will be on 5000
//in order for our front end to actually be able to access our Webserver we have to tell it that we want it to use that port whenever it makes API request
//by adding proxy key to package.json in CLIENT folder ("proxy": "http://localhost:5000"). Create react app will know that when we pass it URLs
// will instead fire them off to local hosts 5000 instead of 3000
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
//urlencoded is a way for us to make sure that URL strings were getting in and we're passing out do not contain things like spaces or symbols
app.use(bodyParser.urlencoded({ extended: true }));
//cors stands for cross origin request. our web server is being hosted from some origin. Like our developet is in port 5000 , but front end is hosted on port 3000
//when our front end makes a request to our backend, as origin is not the same cors denies the request
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };
  stripe.charges.create(body, (stripeError, stripeRes) => {
    if (stripeError) res.status(500).send({ error: stripeError });
    else res.status(200).send({ success: stripeRes });
  });
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
