/*jslint node: true, nomen: true, devel : true, unparam : true */
/*global describe, it, afterEach */

var expect = require('chai').expect,
    request = require('supertest'),
    cheerio = require('cheerio'),
    $ = null,
    app = require('../app').app;

describe('Index Page Specs', function () {
    "use strict";
    afterEach(function () {
        $ = null;
    });

    it('should return being "Angular Log Server" when navigating to / path', function () {
        request(app)
            .get('/')
            .expect(200)
            .end(function (err, res) {
                expect(err).to.eql(null);
                $ = cheerio.load(res.text);
                expect($('html').find('title').text()).to.equal('Angular Log Server');
            });
    });
});