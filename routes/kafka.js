var express = require('express');
var router = express.Router();
var kafka = require('kafka-node');
var Producer = kafka.Producer;
var client = new kafka.Client();

router.get('/', function(req, res, next) {
    var producer = new Producer(client);
    var km = new KeyedMessage('key', 'message')
    var payloads = [{
        topic: 'topic1',
        messages: 'hi',
        partition: 0
    }, {
        topic: 'topic2',
        messages: ['hello', 'world', km]
    }];
    producer.on('ready', function() {
        producer.send(payloads, function(err, data) {
            console.log(data);
            res.render('index', {
                title: 'Express Kafka'
            });
        });
    });
});

module.exports = router;