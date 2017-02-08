# express-sanitizer

[![Build Status](https://travis-ci.org/markau/express-sanitizer.png?branch=master)](https://travis-ci.org/markau/express-sanitizer)

An express middleware for [Caja-HTML-Sanitizer](https://github.com/theSmaw/Caja-HTML-Sanitizer), which wraps [Google Caja sanitizer](https://code.google.com/p/google-caja/wiki/JsHtmlSanitizer).  

A useful complement to the [express-validator](https://github.com/ctavan/express-validator) -- to fill a gap now that XSS sanitization support has been removed from that module's parent [node-validator](https://github.com/chriso/node-validator).

## Installation

```
npm install --save express-sanitizer body-parser
```

## Usage

`expressSanitizer` needs to be instantiated after `bodyParser', and before anything that requires the sanitized input, e.g.:

```javascript
var express = require('express');
var expressSanitizer = require('express-sanitizer');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(expressSanitizer([options])); // this line follows bodyParser() instantiations
```

```javascript
app.post('/:urlparam', function(req, res) {

  // replace an HTTP posted body property with the sanitized string
  req.body.sanitized = req.sanitize(req.body.propertyToSanitize);
});

```

## Output

The string 
```javascript
'<script>hello</script> world'
```
will be sanitized to ' world'.

## Limitations

This is a basic implementation of [Caja-HTML-Sanitizer](https://github.com/theSmaw/Caja-HTML-Sanitizer) with the specific purpose of mitigating against persistent XSS risks. 

## Caveats

This module trusts the dependencies to provide basic persistent XSS risk mitigation. A user of this package should review all packages and make their own decision on security and fitness for purpose. 

## Changelog

### v1.0.1
- Updated sanitizer dependency to 0.1.2

### v1.0.0
- Update to v1

### v0.1.1
- Merged PR removing unused dependency

### v0.1.0
- Initial release

## Contributors

- Mark Andrews <20metresbelow@gmail.com> 
- Patrick Hogan <patrick@callinize.com>

## License

Copyright (c) 2014 Mark Andrews <20metresbelow@gmail.com>, MIT License

