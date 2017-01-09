## Javascript WebServices ##

### Currently ###
#### HttpRequest ####
Handles a request and provides a HttpResponse
#### HttpResponse ####
Operates with the Http Response
#### HttpQuery ####
Helps to build an http query (query string)
#### HttpHeader ####
Handles an Http Header
#### XHR ####
Generic cross browser http request API

# Full API docs
Current 0.1.0-rc.1 (Release candidate) - [Read full API docs](http://howerest.com/js-webservices/modules/_web_services_.webservices.html)

### How to import WebServices (TypeScript) ###
`import { WebServices } from "js-webservices/ts/web_services"`

### Install dependencies ###
`npm install`
`tsd install`

### Build ###
`grunt concat; grunt uglify`

### Generate docs :-) ###
`typedoc --ignoreCompilerErrors --readme ./README --mode modules --out docs/ ts/web_services.ts`