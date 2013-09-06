(function () {
    'use strict';

    var async = require('async'),
        http  = require('http');

    var numberOfPics = parseInt(process.argv[2]);
    var offset = parseInt(process.argv[3]);

    async.timesSeries(numberOfPics - offset, function (n, next) {

        var currentNumber = n + offset + 1;
        console.log(currentNumber);

        var reqOptions = {
            host: 'mvph.herokuapp.com',
            port: 80,
            path: '/p/' + currentNumber,
            method: 'GET'
        };

        var req = http.request(reqOptions, function (res) {
            if(res.statusCode !== 200 && res.statusCode !== 404) {
                next({err: 'Response Error', code: res.statusCode});
                return;
            }

            res.setEncoding('binary');

            res.on('data', function (chunk) {
                // no need to do anything here
            });

            res.on('end', function () {
                // now we can continue to the next
                next();
            });
        });

        req.on('error', function (err) {
            next(err);
        });

        req.end();

    }, function (err) {
        if(err) {
            console.log(err);
            throw err;
        }

        console.log('done');
    });

}).call(this);