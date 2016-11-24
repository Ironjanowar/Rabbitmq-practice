var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
	var q = 'hello';

	ch.assertQueue(q, { durable: false });
	console.log("=>> Waiting for messages in " + q + ". Press CTRL+C to exit.");
	ch.consume(q, function(msg) {
	    console.log("> Message received: " + msg.content.toString());
	}, { noAck: true });
    });
});
