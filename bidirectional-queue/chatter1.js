// Install amqplib
var amqp = require('amqplib/callback_api');
var readline = require('readline');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q1 = 'c1';
        ch.assertQueue(q1, {durable: false});

        // Get message from stdin
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: true
        });

        rl.on('line', function(line){
            ch.sendToQueue(q1, new Buffer(line));
            console.log("> Sent: %s", line);
        });
    });

    conn.createChannel(function(err, ch) {
        var q2 = 'c2';

        ch.assertQueue(q2, {durable: false});
        console.log("... Waiting for messages in %s. To exit press CTRL+C ...", q2);
        ch.consume(q2, function(msg) {
            console.log("> Received: %s", msg.content.toString());
        }, {noAck: true});
    });
});
