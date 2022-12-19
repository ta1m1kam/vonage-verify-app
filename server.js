require('dotenv').config();

const path = require('path')
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const { Vonage } = require('@vonage/server-sdk');

const VONAGE_API_KEY = process.env.VONAGE_API_KEY;
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET;
const VONAGE_BRAND_NAME = process.env.VONAGE_BRAND_NAME;

let verifyRequestId = null;
let verifyRequestNumber = null;

// Location of the application's CSS files
app.use(express.static('build'));

// The session object we will use to manage the user's login state
app.use(session({
    secret: 'loadsofrandomstuff',
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const vonage = new Vonage({
  apiKey: VONAGE_API_KEY,
  apiSecret: VONAGE_API_SECRET,
}, { debug: true });

// Define your routes here
app.post('/verify', async (req, res) => {
  verifyRequestNumber = req.body.number;

  const resp = await vonage.numberInsights.basicLookup(req.body.number);
  console.log(resp);
  if (resp.status !== 0) {
    return res.status(400).send("invalid number");
  }

  vonage.verify.start({
    number: verifyRequestNumber,
    brand: VONAGE_BRAND_NAME
  }).then((resp) => {
    console.log(resp)
    verifyRequestId = resp.request_id;
    console.log(`request_id: ${verifyRequestId}`);
    res.status(201).send("success");
  }).catch(err => console.error(err));
});

app.post('/check-code', (req, res) => {
  console.log(req.body)
  vonage.verify.check(
    verifyRequestId, req.body.code
    ).then((resp) => {
    console.log(resp)
    if (resp.status === '0') {
      req.session.user = {
        number: verifyRequestNumber
      };
    }
    res.status(201).send("success");
  }).catch(err => console.error(err));
});


app.get('/verify-number', (req, res) => {
  console.log(req.session.user)
  res.status(200).send({
    verifyNumber: req?.session?.user?.number,
  })
});

app.post('/send-sms', async (req, res) => {
  const to = req.body.number;
  const text = req.body.text;
  await vonage.sms.send({ to, from: VONAGE_BRAND_NAME, text })
    .then(resp => {
      console.log('Message sent successfully');
      console.log(resp);
    })
    .catch(err => console.error(err));
  res.status(201).send("success");
});

app.post('/number-lookup', async (req, res) => {
  const resp = await vonage.numberInsights.basicLookup(req.body.number);
  console.log(resp);
  res.status(201).send(resp);
})
// Run the web server
const server = app.listen(3000, () => {
    console.log(`Server running on port ${server.address().port}`);
});
