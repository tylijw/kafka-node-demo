var express = require('express');
var router = express.Router();
var kafka = require('kafka-node');
var HighLevelProducer = kafka.HighLevelProducer;
router.get('/', function(req, res, next) {
var client = new kafka.Client('localhost:2181');
    var payloads = [{topic: 'thaync',messages: 'createTopic',partition: 0}];
    var producer = new HighLevelProducer(client);
// create topic async  异步
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
