var express = require('express');
var router = express.Router();
var kafka = require('kafka-node');
var Producer = kafka.Producer;

router.get('/', function(req, res, next) {
var client = new kafka.Client('10.194.1.2:2181');
    var payloads = [{
        topic: 't2',
        messages: 'createTopic',
        partition: 0
    }];

    var producer = new Producer(client);
// create topic async
// asnyc is set to true , until all topics  returns immediately
	producer.createTopics(['t'], true, function (err, data) {
		producer.on('ready',function(){

            	producer.send(payloads, function(err, data) {
            	console.log(data);
            	res.render('index', {
            	title: 'Express Kafka'
				});
			}); 
		});
	});	
});

module.exports = router;

