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


const producer = kafka.producer()
producer.on('producer.connect', () =>{console.log(`KafkaProvider: connected`);});
producer.on('producer.disconnect', () => {console.log(`KafkaProvider: could not connect`);});
producer.on('producer.network.request_timeout', (payload) => {console.log(`KafkaProvider: request timeout ${payload.clientId}`);});
function delay(time) { return new Promise(resolve => setTimeout(resolve, time));} 
const run = async () => {
    // Producing
    await producer.connect()
    let msg = 'Adelade'
    const type = {};
    for (let i = 0; i < 100; i++){
        let key = i.toString().padEnd(6, "A")
        type.FirstName = msg;
        type.Lastname = msg + 1;
        const result= await producer.send({
        topic: 'user-topic',
        messages: [{ "key": key, "value": JSON.stringify(type), "partition": 0 }],
    })
    console.log(`Messsage sent succusfulyy : ${JSON.stringify(result)}`)
    await delay(1000);
}

}

run().catch(console.error)