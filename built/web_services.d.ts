/*! js-webservices 0.1.1 | howerest 2016 - <davidvalin@howerest.com> | Apache 2.0 Licensed */
export declare module WebServices {
    class XHR {
        constructor();
    }
    class HttpHeader {
        name: string;
        value: string;
        constructor(header: Object);
    }
    class HttpRequest {
        client: any;
        query: WebServices.HttpQuery;
        response: HttpResponse;
        promise: Promise<any>;
        constructor(httpQuery: WebServices.HttpQuery);
    }
    class HttpResponse {
        data: Object;
        constructor(baseHost: String, headers: Object, data: string, parseJSON?: boolean);
    }
    class HttpQuery {
        endpoint: string;
        httpMethod: string;
        qsParams: Object;
        headers: WebServices.HttpHeader[];
        data: Object;
        constructor(querySettings: IHttpQuerySettings);
        where(qsParams?: Object): this;
        withHeaders(headers?: WebServices.HttpHeader[]): void;
        withData(data?: Object): void;
        qsParamsToString(qsParams?: Object): string;
        private serialize(obj);
    }
    class Merger {
        static mergeHttpQueries(httpQueries: Array<HttpQuery>): WebServices.HttpQuery;
    }
    interface IHttpQuerySettings {
        endpoint?: string;
        httpMethod?: string;
        qsParams?: Object;
        headers?: WebServices.HttpHeader[];
        data?: Object;
    }
}
