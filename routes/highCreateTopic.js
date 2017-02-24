var express = require('express');
var router = express.Router();
var kafka = require('kafka-node');
var highLevelProducer = kafka.HighLevelProducer;

router.get('/', function(req, res, next) {
var client = new kafka.Client('localhost:2181');
    var payloads = [{
        topic: 'th',
        messages: 'highCreateTopic',
        partition: 0
    }];

    var producer = new highLevelProducer(client);
// create topic sync
// asnyc is set to false , this method does not return until all topics are created
	producer.createTopics(['t','th'], false, function (err, data) {
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

