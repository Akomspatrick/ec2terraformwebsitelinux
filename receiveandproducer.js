// make sure you run chmod +x runscript.sh
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const { Kafka } = require('kafkajs')

// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const kafka = new Kafka({
  clientId: 'user-topic',
  brokers:  ['pkc-ymrq7.us-east-2.aws.confluent.cloud:9092'],
  ssl: true,
  logLevel: 2,
  sasl: {
    mechanism: 'plain',
    username: 'TYS7GRIFCRWDYTW7',
    password:  'JTErBeQnf+6NwhMBSF9skk2nW9afUeoE8aDFS10GMyTe/4fYG5qlSYbht0XW+FoV'
  }
})

// interface User {
//   type: string;
//   Events: string;
//   UserAgent: string;
//   IPAddress: number;
// }

const producer = kafka.producer()
producer.on('producer.connect', () =>{console.log(`KafkaProvider: connected`);});
producer.on('producer.disconnect', () => {console.log(`KafkaProvider: could not connect`);});
producer.on('producer.network.request_timeout', (payload) => {console.log(`KafkaProvider: request timeout ${payload.clientId}`);});

const run = async (result) => {
    // Producing
    await producer.connect()
    const data = {};
  let i = Math.floor(Math.random() * 1000);
  const key= i.toString(6,'A')
        //let key = result.type
        data.Type=result.type
        data.Events = result.Events;
        data.IPAddress = result.IPAddress;
        data.UserAgent = result.UserAgent;
        const responce= await producer.send({
        topic: 'clickevents',
        messages: [{ "key": key, "value": JSON.stringify(data), "partition": 0 }],
    })
    console.log(`Messsage sent succesfuly : ${JSON.stringify(responce)}`)


}


app.use("/webhooks/optimizely", bodyParser.text({ type: "*/*" }),
  (req, res, next) => {

    const webhook_payload = req.body;
    console.log(webhook_payload);
    var result = JSON.parse(webhook_payload);
    console.log(`   received! ${result.type}   and ${result.Events} `);
    console.log(`   received! ${result.UserAgent}   and ${result.IPAddress} `);
    console.log(new Date())
//
    //send out using producer
    run(result).catch(console.error);

   res.send(req.body)
  }
);

app.get("/", (req, res) => { res.send('Site is up .....')})
app.listen(5001, () => { console.log('app is running @ 5001') })
    
