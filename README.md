# express-sanitizer

[![Build Status](https://secure.travis-ci.org/markau/express-sanitizer.png)](http://travis-ci.org/markau/express-sanitizer)

An express middleware for [Caja-HTML-Sanitizer](https://github.com/theSmaw/Caja-HTML-Sanitizer), which wraps [Google Caja sanitizer](https://code.google.com/p/google-caja/wiki/JsHtmlSanitizer).  

A useful complement to the [express-validator](https://github.com/ctavan/express-validator) to fill a gap now that XSS sanitization support has been removed from that module's parent [node-validator](https://github.com/chriso/node-validator).

## Installation

```
npm install express-sanitizer
```

## Usage

Needs to be called after express.bodyParser() and before anything that requires the sanitized input, e.g.:

```javascript
var express = require('express'),
    expressSanitizer = require('express-sanitizer');

app.use(express.bodyParser());
app.use(expressSanitizer([options])); // this line must be immediately after express.bodyParser()!
```

```javascript
app.post('/:urlparam', function(req, res) {
  //validation here

  // replace an HTTP posted body property 'propertyToSanitize' with the sanitized string
  req.body.propertyToSanitize = req.sanitize(req.param('propertyToSanitize'));
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

### v0.1.0
- Initial release

## Contributors

- Mark Andrews <mark3d@gmail.com> - Wrap the sanitizer in an npm package

## License

Copyright (c) 2014 Mark Andrews <mark3d@gmail.com>, MIT License

