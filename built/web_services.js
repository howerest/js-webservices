/*! js-webservices 0.1.0-rc.7 | howerest 2016 - <davidvalin@howerest.com> | Apache 2.0 Licensed */
"use strict";
var es6_promise_1 = require("es6-promise");
var util_1 = require("./util");
var WebServices;
(function (WebServices) {
    var XHR = (function () {
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
    var HttpHeader = (function () {
        function HttpHeader(header) {
            this.name = Object.keys(header)[0];
            this.value = header[Object.keys(header)[0]];
        }
        return HttpHeader;
    }());
    WebServices.HttpHeader = HttpHeader;
    var HttpRequest = (function () {
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
            if (Object.keys(this.query.qsParams).length > 0) {
                endpoint += '?';
                var i = 0;
                var keys_1 = Object.keys(this.query.qsParams);
                for (var _i = 0, keys_2 = keys_1; _i < keys_2.length; _i++) {
                    var key = keys_2[_i];
                    if (i > 0) {
                        endpoint += '&';
                    }
                    endpoint += key + "=" + this.query.qsParams[key];
                    i++;
                }
            }
            this.client.open(this.query.httpMethod, endpoint);
            for (var i = 0; i < this.query['headers'].length; i++) {
                this.client.setRequestHeader(this.query.headers[i].name, this.query.headers[i].value);
            }
            if (!this.query.headers['Accept']) {
                this.client.setRequestHeader('Accept', 'application/json');
            }
            if (!this.query.headers['Content-Type']) {
                this.client.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            }
            this.promise = new es6_promise_1.Promise(function (resolve, reject) {
                _this.client.onreadystatechange = function (e) {
                    if (e && e.target['readyState'] == 4) {
                        if (e.target['status'] == 200 || e.target['status'] == 204) {
                            _this.response = new HttpResponse(endpoint, {}, e.target['responseText'] ? e.target['responseText'] : null);
                            resolve(_this.response);
                        }
                        else {
                            _this.promise = es6_promise_1.Promise.reject(false);
                            resolve({});
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
    var HttpResponse = (function () {
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
    var HttpQuery = (function () {
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
        HttpQuery.prototype.where = function (qsParams) {
            if (qsParams === void 0) { qsParams = {}; }
            for (var key in qsParams) {
                if (qsParams.hasOwnProperty(key)) {
                    this.qsParams[key] = qsParams[key];
                }
            }
            return this;
        };
        HttpQuery.prototype.withHeaders = function (headers) {
            if (headers === void 0) { headers = []; }
            this.headers = headers;
        };
        HttpQuery.prototype.withData = function (data) {
            if (data === void 0) { data = {}; }
            this.data = data;
        };
        HttpQuery.prototype.qsParamsToString = function (qsParams) {
            if (qsParams === void 0) { qsParams = this.qsParams; }
            return this.serialize(qsParams);
        };
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
    var Merger = (function () {
        function Merger() {
        }
        Merger.mergeHttpQueries = function (httpQueries) {
            var queryAttrs = ['httpMethod', 'endpoint', 'headers', 'qsParams', 'data'];
            var finalHttpQuery = new WebServices.HttpQuery({
                endpoint: null,
                httpMethod: null,
                qsParams: {},
                headers: [],
                data: {}
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
