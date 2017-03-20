/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/jasmine-ajax/jasmine-ajax.d.ts" />
/// <reference path="../web_services.ts" />

/* js-webservices 0.1.0-rc.9 | howerest 2016 - <davidvalin@howerest.com> | Apache 2.0 Licensed */

import { WebServices } from "../web_services";

describe('HttpRequest', () => {
  beforeEach(() => {
    jasmine.Ajax.install();

    jasmine.Ajax.stubRequest('http://api.mydomain.com/items/1').andReturn({
      status: 200,
      contentType: 'text/xml;charset=UTF-8',
      responseText: "{ id: 1000, name: 'An age group', items: [{ age: 2 }, { older_than: 68 }, { older_than: 10, younger_than: 19 }] }"
    });
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  describe('.constructor', () => {
    describe("when XMLHttpRequest doesn't exist", () => {
      xit('it should require a Node.js XMLHttpRequest implementation', () => {

      });
    });

    describe('when XMLHttpRequest is not defined', () => {

    });

    describe("when the XMLHttpRequest api exist", () => {
      var httpQueryOpts;

      beforeEach(() => {
        httpQueryOpts = {
          httpMethod: "GET",
          endpoint:   'http://api.mydomain.com/items/1',
          qsParams:   {},
          headers:    [],
          data:       {}
        };
      });

      it('shoud make a request to the endpoint', () => {
        var doneFn = jasmine.createSpy("onSuccess");
        var query = new WebServices.HttpQuery(httpQueryOpts);
        var httpRequest = new WebServices.HttpRequest(query);
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://api.mydomain.com/items/1');
        expect(jasmine.Ajax.requests.mostRecent().status).toBe(200);
        expect(httpRequest.promise).not.toBe(undefined);
      });

      xit('shoud use the http verb specified', () => {

      });

      xit('shoud set the proper http headers', () => {

      });

      xit('shoud pass the proper query string', () => {

      });

      xit('shoud pass the proper data', () => {

      });

      it('should return a Promise', () => {
        var doneFn = jasmine.createSpy("success");
        var query = new WebServices.HttpQuery(httpQueryOpts);
        var httpRequest = new WebServices.HttpRequest(query);
        expect(httpRequest.promise).not.toBe(undefined);
      });
    });
  });
});


describe('HttpResponse', () => {
  describe('.constructor', () => {
    xit('shoud expose the attributes with keys camlized', () => {

    });
  });
});
