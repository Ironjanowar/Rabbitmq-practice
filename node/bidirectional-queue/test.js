var amqp = require('amqp');

var connection = amqp.createConnection();

// add this for better debuging
connection.on('error', function(e) {
    console.log("Error from amqp: ", e);
});

// Wait for connection to become established.
connection.on('ready', function () {
    console.log("...Connection created...")

    // Use the default 'amq.topic' exchange
    connection.queue('queue1', function (q) {
	console.log('> Queue created as: ' + q.name);
        // Catch all messages
        q.bind('#');

        // Receive messages
        q.subscribe(function (message) {
            // Print messages to stdout
            console.log(message);
        });
    });
});

var print_keys = function print_keys(obj) {
    var ret = "";
    for(var k in obj) {
	ret += "-> " + k + "\n"
    }

    return ret;
}
