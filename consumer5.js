var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var Client = kafka.Client;
var client = new Client('localhost:2181')

var argv = {
    topic: "thaync"
};

var topic = argv.topic || 'thaync';

var topics = [{
        topic: topic,
        partition: 0
    }],
    options = {
        autoCommit: false
    };

var consumer = new Consumer(client, topics, options);
consumer.on('message', function(message) {
    console.log(message);
});