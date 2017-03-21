/*! js-webservices 0.1.0 | howerest 2016 - <davidvalin@howerest.com> | Apache 2.0 Licensed */

import { Promise } from "es6-promise";
import { Util } from "./util";

declare let ActiveXObject: (type: string) => void;
declare let xhr2 : () => void;

export module WebServices {

  declare let XMLHttpRequest:any;
  declare let require:any;

  export class XHR {
    constructor() {
      try { return new XMLHttpRequest(); } catch(e) {}
      try { return new ActiveXObject("Msxml3.XMLHTTP"); } catch(e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch(e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch(e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) {}
      try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch(e) {}
      return null;
    }
  }

  /*!
   * Handles a Http Header
   */
  export class HttpHeader {
    public name: string;
    public value: string;

    constructor(header:Object) {
      this.name = Object.keys(header)[0];
      this.value = header[Object.keys(header)[0]];
    }
  }

  /*!
   * Handles a Http Request
   */
  export class HttpRequest {
    client: any;
    query:WebServices.HttpQuery;
    response: HttpResponse = null
    promise: Promise<any>

    constructor(httpQuery:WebServices.HttpQuery) {
      this.query = httpQuery;
      let _this = this, data = null, keys;
      let endpoint = this.query.endpoint;

      if (Util.EnvChecker.isBrowser()) {
        this.client = new XHR();
      } else if (Util.EnvChecker.isNode()){
        let XMLHttpRequest = xhr2;
        this.client = new XMLHttpRequest();
      } else {
        return;
      }

      // Add query string to url
      if (Object.keys(this.query.qsParams).length > 0) {
        endpoint += '?';
        let i=0;
        let keys = Object.keys(this.query.qsParams);
        for(let key of keys) {
          if (i > 0) { endpoint += '&'; }
          endpoint += key+"="+this.query.qsParams[key];
          i++;
        }
      }

      // Set method & url
      this.client.open(this.query.httpMethod, endpoint);

      // Set headers
      for (let i = 0; i < this.query['headers'].length; i++) {
        this.client.setRequestHeader(this.query.headers[i].name, this.query.headers[i].value);
      }
      if (!this.query.headers['Accept']) {
        this.client.setRequestHeader('Accept', 'application/json');
      }
      if (!this.query.headers['Content-Type']) {
        this.client.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      }
      // Promise
      this.promise = new Promise(function(resolve, reject) {
        // Resolve a HttpResponse when success
        _this.client.onreadystatechange = function(e) {
          if (e && e.target['readyState'] == 4) {
            if (e.target['status'] == 200 || e.target['status'] == 201 || e.target['status'] == 204) {
              _this.response = new HttpResponse(endpoint, {}, e.target['responseText'] ? e.target['responseText'] : null);
              resolve(_this.response);
            } else {
              reject(false);
            }
          }
        };
      });

      if (typeof(this.query.data) === "object") {
        keys = Object.keys(this.query.data);
        if (keys.length > 0) {
          data = JSON.stringify(this.query.data);
        }
      }

      this.client.send(data);
    }
  }


  /*
   * Handles a Http Response
   */
  export class HttpResponse {
    data:Object
    constructor(baseHost: String, headers: Object, data: string, parseJSON: boolean = true) {
      if (data && parseJSON) {
        try {
          this.data = JSON.parse(data);
        } catch(e) {
          console.log('sdkzer> error when parsing JSON response. The received data is malformed');
        }
      } else {
        this.data = data;
      }
    }
  }


  /*
   *  Implements an API to build HTTP queries
   *
   *  Code sample:
   *
   *    let query = new HttpQuery();
   *    query.where({ name: "David" });
   *
   *    if (loggedIn()) {
   *      query.where({ include: ['author'] });
   *    }
   *
   *    if (filters['category_id']) {
   *      query.where({ category_id: filters['category_id'].join('|') });
   *    }
   *
   *    Posts.fetchAll(query)
   */
  export class HttpQuery {
    public endpoint:string;
    public httpMethod:string = 'GET';
    public qsParams:Object = {};
    public headers:WebServices.HttpHeader[] = [];
    public data:Object = {};

    constructor(querySettings: IHttpQuerySettings) {
      this.endpoint = querySettings.endpoint
      this.httpMethod = querySettings.httpMethod
      this.qsParams = querySettings.qsParams;
      this.headers = querySettings.headers;
      this.data = querySettings.data;
    }


    /*!
     *  Implements a Http Querier API to modify the query
     *  Query String parameters are right way to query an restful http resource
     */
    public where(qsParams:Object = {}) {

      // qs:
      // headers:
      // data:

      for (let key in qsParams) {
        if (qsParams.hasOwnProperty(key)) {
          this.qsParams[key] = qsParams[key];
        }
      }

      return this;
    }


    /*!
     *  Sets a list of HttpHeaders for the HttpQuery
     */
    public withHeaders(headers:WebServices.HttpHeader[] = []) {
      this.headers = headers;
    }


    /*!
     *  Sets the data for the HttpQuery
     */
    public withData(data:Object = {}) {
      this.data = data;
    }


    /*
     *  Returns the HttpQuery query string in string format (URI encoded)
     */
     public qsParamsToString(qsParams:Object = this.qsParams) {
       return this.serialize(qsParams);
     }


    /*
     *  Serialize
     */
     private serialize(obj:Object) {
       let items = [];

       for(let key in obj) {
         let k = key, value = obj[key];
         items.push(typeof(value) === "object" ? this.serialize(value) : encodeURIComponent(key) + "=" + encodeURIComponent(value));
       }

       return items.join("&");
     }
  }


  /*!
   * Merges data
   */
  export class Merger {
    /*
     *  Merges a list of HttpQueries into a single HttpQuery
     */
    public static mergeHttpQueries(httpQueries: Array<HttpQuery>) : WebServices.HttpQuery {
      let queryAttrs = ['httpMethod', 'endpoint', 'headers', 'qsParams', 'data'];
      let finalHttpQuery : WebServices.HttpQuery = new WebServices.HttpQuery({
        endpoint: null,
        httpMethod: null,
        qsParams: {},
        headers: [],
        data: {},
      });

      for (let i = 0; i < httpQueries.length; i++) {
        for (let i2 = 0; i2 < queryAttrs.length; i2++) {
            if (typeof (httpQueries[i][queryAttrs[i2]]) !== "undefined") {
              finalHttpQuery[queryAttrs[i2]] = httpQueries[i][queryAttrs[i2]];
            }
        }
      }

      return finalHttpQuery;
    }
  }

  export interface IHttpQuerySettings {
    endpoint?: string
    httpMethod?: string
    qsParams?: Object
    headers?: WebServices.HttpHeader[]
    data?: Object
  }
}
