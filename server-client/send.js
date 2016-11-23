var amqp = require('amqplib/callback_api');
var readline = require('readline');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = "hello";
        var msg = "PING!";

        ch.assertQueue(q, { durable: false });
        ch.sendToQueue(q, new Buffer(msg));
        console.log(">> Message '" + msg + "' sent");

        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: true
        });

        rl.on('line', function(line){
            ch.sendToQueue(q, new Buffer(line));
            console.log("Sent: " + line);

        });
    });
});
