/* js-webservices 0.1.2 | howerest 2018 - <davidvalin@howerest.com> | Apache 2.0 Licensed */

import { WebServices } from "../src/web_services";
import xhrMock from 'xhr-mock';

describe('HttpRequest', () => {
  const JSONResponse = {
    id: 1000,
    name: 'An age group',
    items: [
      { age: 2 },
      { older_than: 68 },
      { older_than: 10, younger_than: 19 }
    ]
  };

  beforeEach(() => {
    xhrMock.setup();
  });

  afterEach(() => {
    xhrMock.teardown();
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
        xhrMock.get('http://api.mydomain.com/items/1', (req, res) => {
          expect(req.url()['host']).toEqual('api.mydomain.com');
          expect(req.url()['path']).toEqual('/items/1');
          expect(req.url()['protocol']).toEqual('http');
          expect(req.method()).toEqual("GET");
          return res.status(200).body(JSON.stringify(JSONResponse));
        });
        const query = new WebServices.HttpQuery(httpQueryOpts);
        const httpRequest = new WebServices.HttpRequest(query);
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

      xit('should return a Promise', () => {
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
