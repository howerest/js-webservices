/* js-webservices 0.1.1 | howerest 2016 - <davidvalin@howerest.com> | Apache 2.0 Licensed */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web_services_1 = require("../web_services");
describe('HttpRequest', function () {
    beforeEach(function () {
        jasmine.Ajax.install();
        jasmine.Ajax.stubRequest('http://api.mydomain.com/items/1').andReturn({
            status: 200,
            contentType: 'text/xml;charset=UTF-8',
            responseText: "{ id: 1000, name: 'An age group', items: [{ age: 2 }, { older_than: 68 }, { older_than: 10, younger_than: 19 }] }"
        });
    });
    afterEach(function () {
        jasmine.Ajax.uninstall();
    });
    describe('.constructor', function () {
        describe("when XMLHttpRequest doesn't exist", function () {
            xit('it should require a Node.js XMLHttpRequest implementation', function () {
            });
        });
        describe('when XMLHttpRequest is not defined', function () {
        });
        describe("when the XMLHttpRequest api exist", function () {
            var httpQueryOpts;
            beforeEach(function () {
                httpQueryOpts = {
                    httpMethod: "GET",
                    endpoint: 'http://api.mydomain.com/items/1',
                    qsParams: {},
                    headers: [],
                    data: {}
                };
            });
            it('shoud make a request to the endpoint', function () {
                var doneFn = jasmine.createSpy("onSuccess");
                var query = new web_services_1.WebServices.HttpQuery(httpQueryOpts);
                var httpRequest = new web_services_1.WebServices.HttpRequest(query);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://api.mydomain.com/items/1');
                expect(jasmine.Ajax.requests.mostRecent().status).toBe(200);
                expect(httpRequest.promise).not.toBe(undefined);
            });
            xit('shoud use the http verb specified', function () {
            });
            xit('shoud set the proper http headers', function () {
            });
            xit('shoud pass the proper query string', function () {
            });
            xit('shoud pass the proper data', function () {
            });
            it('should return a Promise', function () {
                var doneFn = jasmine.createSpy("success");
                var query = new web_services_1.WebServices.HttpQuery(httpQueryOpts);
                var httpRequest = new web_services_1.WebServices.HttpRequest(query);
                expect(httpRequest.promise).not.toBe(undefined);
            });
        });
    });
});
describe('HttpResponse', function () {
    describe('.constructor', function () {
        xit('shoud expose the attributes with keys camlized', function () {
        });
    });
});
//# sourceMappingURL=web_services_spec.js.map