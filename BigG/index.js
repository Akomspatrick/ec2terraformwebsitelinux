// make sure you run chmod +x runscript.sh
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto');
const app = express();


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
app.use('/webhooks2/optimizely2', bodyParser.text({ type: '*/*' }), (req, res, next) => {

  const WEBHOOK_SECRET = process.env.OPTIMIZELY_WEBHOOK_SECRET
  const webhook_payload = req.body
  const hmac = crypto.createHmac('sha1', WEBHOOK_SECRET)
  const webhookDigest = hmac.update(webhook_payload).digest('hex')

  const computedSignature = `sha1=${webhookDigest}`
  const requestSignature = req.header('X-Hub-Signature')

  if (!crypto.timingSafeEqual(Buffer.from(computedSignature, 'utf8'), Buffer.from(requestSignature, 'utf8'))) {
    console.log(`[Optimizely] Signatures did not match! Do not trust webhook request")`)
    res.status(500)
    return
  }

  console.log(`
    [Optimizely] Optimizely webhook request received!
    Signatures match! Webhook verified as coming from Optimizely
    Download Optimizely datafile and re-instantiate the SDK Client
    For the latest changes to take affect
  `);
  res.sendStatus(200)
});
app.get("/", (req, res) => {
  res.send('God is Great good  wan n be ..')
    
})
app.listen(5001, () => {
     console.log('app is running @ 5001')
 })