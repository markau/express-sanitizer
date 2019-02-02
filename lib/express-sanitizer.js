var sanitizer = require('sanitizer');

var expressSanitizer = function sanitize() {

  return function(req, res, next) {
    req.sanitize = function(param) {
      if (param) {
        return sanitizer.sanitize(param);
      }
    };
    next();
  };

};
module.exports = expressSanitizer;
