/*jslint node: true, nomen: true, devel : true, unparam : true */
/*global describe, it, afterEach */

var expect = require('chai').expect,
    request = require('supertest'),
    _ = require('lodash'),
    app = require('../app').app;

describe('LogEx Server Specs', function () {
    "use strict";

    it('should insert an array of log records into log storage', function () {
        var type = 'log-test-type';
        request(app)
            .post('/log')
            .send([{
                type: type, // only using this for testing purposes to find the record
                message: "Unexpected token else",
                stack: 'SyntaxError: Unexpected token else↵    at Object.InjectedScript._evaluateOn (<anonymous>:613:39)↵    at Object.InjectedScript._evaluateAndWrap (<anonymous>:573:52)↵    at Object.InjectedScript.evaluate (<anonymous>:492:21)',
                browser: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.46 Safari/537.36"
            }])
            .end(function (err, res) {
                var resq = JSON.parse(res.text),
                    record = _.find(resq, function (record) {
                        return record.type === type;
                    });

                expect(record.type).to.equal(type);
                expect(record.created_at).to.not.eql(undefined);
                expect(record.updated_at).to.not.eql(undefined);
            });
    });

    it('should return a list of log records from local storage', function () {
        request(app)
            .get('/log')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(err).to.eql(null);
                var data = JSON.parse(res.text);
                expect(data.length).to.above(0);
            });
    });

});