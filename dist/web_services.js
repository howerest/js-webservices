"use strict";
/*! js-webservices 0.1.2 | howerest 2018 - <davidvalin@howerest.com> | Apache 2.0 Licensed */
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var WebServices;
(function (WebServices) {
    var XHR = /** @class */ (function () {
        function XHR() {
            try {
                return new XMLHttpRequest();
            }
            catch (e) { }
            try {
                return new ActiveXObject("Msxml3.XMLHTTP");
            }
            catch (e) { }
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            }
            catch (e) { }
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            }
            catch (e) { }
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) { }
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) { }
            return null;
        }
        return XHR;
    }());
    WebServices.XHR = XHR;
    /*!
     * Handles a Http Header
     */
    var HttpHeader = /** @class */ (function () {
        function HttpHeader(header) {
            this.name = Object.keys(header)[0];
            this.value = header[Object.keys(header)[0]];
        }
        return HttpHeader;
    }());
    WebServices.HttpHeader = HttpHeader;
    /*!
     * Handles a Http Request
     */
    var HttpRequest = /** @class */ (function () {
        function HttpRequest(httpQuery) {
            this.response = null;
            this.query = httpQuery;
            var _this = this, data = null, keys;
            var endpoint = this.query.endpoint;
            if (util_1.Util.EnvChecker.isBrowser()) {
                this.client = new XHR();
            }
            else if (util_1.Util.EnvChecker.isNode()) {
                var XMLHttpRequest_1 = xhr2;
                this.client = new XMLHttpRequest_1();
            }
            else {
                return;
            }
            // Add query string to url
            if (Object.keys(this.query.qsParams).length > 0) {
                endpoint += '?';
                var i = 0;
                var keys_2 = Object.keys(this.query.qsParams);
                for (var _i = 0, keys_1 = keys_2; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    if (i > 0) {
                        endpoint += '&';
                    }
                    endpoint += key + "=" + this.query.qsParams[key];
                    i++;
                }
            }
            // Set method & url
            this.client.open(this.query.httpMethod, endpoint);
            // Set headers
            for (var i = 0; i < this.query['headers'].length; i++) {
                this.client.setRequestHeader(this.query.headers[i].name, this.query.headers[i].value);
            }
            if (!this.query.headers['Accept']) {
                this.client.setRequestHeader('Accept', 'application/json');
            }
            if (!this.query.headers['Content-Type']) {
                this.client.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            }
            // Promise
            this.promise = new Promise(function (resolve, reject) {
                // Resolve a HttpResponse when success
                _this.client.onreadystatechange = function (e) {
                    if (e && e.target['readyState'] == 4) {
                        if (e.target['status'] == 200 || e.target['status'] == 201 || e.target['status'] == 204) {
                            _this.response = new HttpResponse(endpoint, {}, e.target['responseText'] ? e.target['responseText'] : null);
                            resolve(_this.response);
                        }
                        else {
                            reject(false);
                        }
                    }
                };
            });
            if (typeof (this.query.data) === "object") {
                keys = Object.keys(this.query.data);
                if (keys.length > 0) {
                    data = JSON.stringify(this.query.data);
                }
            }
            this.client.send(data);
        }
        return HttpRequest;
    }());
    WebServices.HttpRequest = HttpRequest;
    /*
     * Handles a Http Response
     */
    var HttpResponse = /** @class */ (function () {
        function HttpResponse(baseHost, headers, data, parseJSON) {
            if (parseJSON === void 0) { parseJSON = true; }
            if (data && parseJSON) {
                try {
                    this.data = JSON.parse(data);
                }
                catch (e) {
                    console.log('sdkzer> error when parsing JSON response. The received data is malformed');
                }
            }
            else {
                this.data = data;
            }
        }
        return HttpResponse;
    }());
    WebServices.HttpResponse = HttpResponse;
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
    var HttpQuery = /** @class */ (function () {
        function HttpQuery(querySettings) {
            this.httpMethod = 'GET';
            this.qsParams = {};
            this.headers = [];
            this.data = {};
            this.endpoint = querySettings.endpoint;
            this.httpMethod = querySettings.httpMethod;
            this.qsParams = querySettings.qsParams;
            this.headers = querySettings.headers;
            this.data = querySettings.data;
        }
        /*!
         *  Implements a Http Querier API to modify the query
         *  Query String parameters are right way to query an restful http resource
         */
        HttpQuery.prototype.where = function (qsParams) {
            // qs:
            // headers:
            // data:
            if (qsParams === void 0) { qsParams = {}; }
            for (var key in qsParams) {
                if (qsParams.hasOwnProperty(key)) {
                    this.qsParams[key] = qsParams[key];
                }
            }
            return this;
        };
        /*!
         *  Sets a list of HttpHeaders for the HttpQuery
         */
        HttpQuery.prototype.withHeaders = function (headers) {
            if (headers === void 0) { headers = []; }
            this.headers = headers;
        };
        /*!
         *  Sets the data for the HttpQuery
         */
        HttpQuery.prototype.withData = function (data) {
            if (data === void 0) { data = {}; }
            this.data = data;
        };
        /*
         *  Returns the HttpQuery query string in string format (URI encoded)
         */
        HttpQuery.prototype.qsParamsToString = function (qsParams) {
            if (qsParams === void 0) { qsParams = this.qsParams; }
            return this.serialize(qsParams);
        };
        /*
         *  Serialize
         */
        HttpQuery.prototype.serialize = function (obj) {
            var items = [];
            for (var key in obj) {
                var k = key, value = obj[key];
                items.push(typeof (value) === "object" ? this.serialize(value) : encodeURIComponent(key) + "=" + encodeURIComponent(value));
            }
            return items.join("&");
        };
        return HttpQuery;
    }());
    WebServices.HttpQuery = HttpQuery;
    /*!
     * Merges data
     */
    var Merger = /** @class */ (function () {
        function Merger() {
        }
        /*
         *  Merges a list of HttpQueries into a single HttpQuery
         */
        Merger.mergeHttpQueries = function (httpQueries) {
            var queryAttrs = ['httpMethod', 'endpoint', 'headers', 'qsParams', 'data'];
            var finalHttpQuery = new WebServices.HttpQuery({
                endpoint: null,
                httpMethod: null,
                qsParams: {},
                headers: [],
                data: {},
            });
            for (var i = 0; i < httpQueries.length; i++) {
                for (var i2 = 0; i2 < queryAttrs.length; i2++) {
                    if (typeof (httpQueries[i][queryAttrs[i2]]) !== "undefined") {
                        finalHttpQuery[queryAttrs[i2]] = httpQueries[i][queryAttrs[i2]];
                    }
                }
            }
            return finalHttpQuery;
        };
        return Merger;
    }());
    WebServices.Merger = Merger;
})(WebServices = exports.WebServices || (exports.WebServices = {}));
//# sourceMappingURL=web_services.js.map