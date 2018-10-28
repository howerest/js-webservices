/*! js-webservices 0.1.2 | howerest 2018 - <davidvalin@howerest.com> | Apache 2.0 Licensed */
export declare module WebServices {
    class XHR {
        constructor();
    }
    /*!
     * Handles a Http Header
     */
    class HttpHeader {
        name: string;
        value: string;
        constructor(header: Object);
    }
    /*!
     * Handles a Http Request
     */
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
        /*!
         *  Implements a Http Querier API to modify the query
         *  Query String parameters are right way to query an restful http resource
         */
        where(qsParams?: Object): this;
        /*!
         *  Sets a list of HttpHeaders for the HttpQuery
         */
        withHeaders(headers?: WebServices.HttpHeader[]): void;
        /*!
         *  Sets the data for the HttpQuery
         */
        withData(data?: Object): void;
        qsParamsToString(qsParams?: Object): string;
        private serialize;
    }
    /*!
     * Merges data
     */
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
