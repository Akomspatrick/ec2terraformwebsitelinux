// make sure you run chmod +x runscript.sh
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const {Kafka} =require("kafkajs")
const msg = "process.argv[2]"
const type = {};
var request = require('request')

//const GalaxyEndPoint = "https://webhook.site/3c84772c-742a-4f17-b84a-df54f1a8f958"

// interface User {
//   type: string;
//   Events: string;
//   UserAgent: string;
//   IPAddress: number;
// }


app.use("/webhooks/optimizely", bodyParser.text({ type: "*/*" }),
  (req, res, next) => {
    //console.log("It has entered first");
    const webhook_payload = req.body;
    console.log(webhook_payload);
    var result = JSON.parse(webhook_payload);
    //let obj: User = JSON.parse(webhook_payload);


    const postbody = { form: webhook_payload}
    request.post(GalaxyEndPoint, postbody, function (error, response, body)
         {
        if (!error && response.statusCode == 200)
        {
          console.log(body)
        }
    });
    console.log(`   received! ${result.type}   and ${result.Events} `);
    console.log(`  received! ${result.UserAgent}   and ${result.IPAddress} `);
    console.log(new Date())
  res.send(req.body)
  }
);

app.get("/", (req, res) => { res.send('Site is up .....')})
app.listen(5001, () => { console.log('app is running @ 5001') })
    
