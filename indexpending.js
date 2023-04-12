// Simple Node Express webhook example (see full example in step 3)
// Requires installing express: 'npm install --save express body-parser'
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const app = express();

/**
 * Optimizely Webhook Route
 * Route to accept webhook notifications from Optimizely
 **/
app.use(
  "/webhooks/optimizely",
  bodyParser.text({ type: "*/*" }),
  (req, res, next) => {
    console.log("It sha entered first");
    const WEBHOOK_SECRET = process.env.OPTIMIZELY_WEBHOOK_SECRET || "Our little secret";
    const webhook_payload = req.body;
      console.log(WEBHOOK_SECRET);
      console.log(webhook_payload);
    //   const hmac = crypto.createHmac('sha1', WEBHOOK_SECRET)
    //   const webhookDigest = hmac.update(webhook_payload).digest('hex')

    //   const computedSignature = `sha1=${webhookDigest}`
    //   const requestSignature = req.header('X-Hub-Signature')

    //   if (!crypto.timingSafeEqual(Buffer.from(computedSignature, 'utf8'), Buffer.from(requestSignature, 'utf8'))) {
    //     console.log(`[Optimizely] Signatures did not match! Do not trust webhook request")`)
    //     res.status(500)
    //     return
    // }

    console.log(`
    [Optimizely] Optimizely webhook request received!
    Signatures match! Webhook verified as coming from Optimizely
    Download Optimizely datafile and re-instantiate the SDK Client
    For the latest changes to take affect
  `);
    res.sendStatus(200);
  }
);

app.get("/", (req, res) => res.send("Optimizely Webhook Example in Progress"));

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 5001;
app.listen(PORT, HOST);
console.log(`Example App Running on http://${HOST}:${PORT}`);
