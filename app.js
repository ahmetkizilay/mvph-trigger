(function () {
    'use strict';

    var async = require('async'),
        http  = require('http');

    var numberOfPics = 6972;
    
    async.timesSeries(numberOfPics, function (n, next) {
        console.log(n);

        var reqOptions = {
            host: 'mvph.herokuapp.com',
            port: 80,
            path: '/p/' + (n + 1),
            method: 'GET'
        };

        var req = http.request(reqOptions, function (res) {
            if(res.statusCode !== 200) {
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
            throw err;
        }

        console.log('done');
    });

}).call(this);