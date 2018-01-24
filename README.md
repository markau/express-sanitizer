[![npm](https://img.shields.io/npm/v/express-sanitizer.svg?style=flat-square)](https://github.com/markau/express-sanitizer)
[![npm](https://img.shields.io/npm/dt/express-sanitizer.svg?style=flat-square)](https://github.com/markau/express-sanitizer)
[![npm](https://img.shields.io/npm/dm/express-sanitizer.svg?style=flat-square)](https://github.com/markau/express-sanitizer)
[![Build Status](https://travis-ci.org/markau/express-sanitizer.png?branch=master&style=flat-square)](https://travis-ci.org/markau/express-sanitizer)
[![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)](https://github.com/markau/express-sanitizer)
[![dependencies](https://david-dm.org/markau/express-sanitizer.svg?style=flat-square)](https://david-dm.org/markau/express-sanitizer)

# express-sanitizer

An express middleware for [Caja-HTML-Sanitizer](https://github.com/theSmaw/Caja-HTML-Sanitizer), which wraps [Google Caja sanitizer](https://code.google.com/p/google-caja/wiki/JsHtmlSanitizer).  

A useful complement to the [express-validator](https://github.com/ctavan/express-validator) -- to fill a gap now that XSS sanitization support has been removed from that module's parent [node-validator](https://github.com/chriso/node-validator).

## Installation

Scaffold an application using [express-generator](http://expressjs.com/en/starter/generator.html)

Then, install this library:
```
npm install --save express-sanitizer
```

## Usage

### Edit `app.js`

Import the module with this declaration at the top of the file:

```javascript
var expressSanitizer = require('express-sanitizer');
```

Mount the middleware *below* the bodyParser() instantiations and *above* mounting of your routes

```javascript
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Mount express-sanitizer here
app.use(expressSanitizer()); // this line follows bodyParser() instantiations

app.use('/', index);
app.use('/users', users);
```

### Edit `routes/index.js` and create a new route:

```javascript
router.post('/', function(req, res, next) {
  // replace an HTTP posted body property with the sanitized string
  req.body.sanitized = req.sanitize(req.body.propertyToSanitize);
  // send the response
  res.send('Your value was sanitized to: ' + req.body.sanitized);
});
```

Use a client such as Postman to post a `x-www-form-encoded` body value, with key named `propertyToSanitize`, to `http://localhost:3000`

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

### v1.0.3
- Updated README to base example on an express-generator scaffolded application

### v1.0.2
- Updated sanitizer dependency to 0.1.3
- Merged PR #4 from @ScottRamsden

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
- Scott Ramsden @ScottRamsden

## License

Copyright (c) 2018 Mark Andrews <20metresbelow@gmail.com>, MIT License

