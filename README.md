## Javascript WebServices

### Currently:

1. HttpRequest
Handles a request and provides a HttpResponse

2. HttpResponse
Operates with the Http Response

3. HttpQuery
Helps to build an http query (query string)

4. HttpHeader
Handles an Http Header

5. XHR
Generic cross browser http request API

# Full API docs
Current 0.1.0-rc.7 (Release candidate) - [Read full API docs](http://howerest.com/js-webservices/modules/_web_services_.webservices.html)

### How to import WebServices (TypeScript)
`import { WebServices } from "js-webservices/ts/web_services"`

### Install dependencies
`npm install; tsd install`

### Build
`grunt concat; grunt uglify`

### Generate docs :-)
`typedoc --ignoreCompilerErrors --readme ./README.md --mode modules --out docs/ src/web_services.ts`
