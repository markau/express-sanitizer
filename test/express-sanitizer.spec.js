const assert = require("assert");
const middleware = require("../lib/express-sanitizer");

let httpMocks = require('node-mocks-http');
let request = {};
let response = {};

describe('express-sanitizer test suite', function(){

    // Mock request/response
    context('Sanitize', function() {

        beforeEach(function(done) {
            request = httpMocks.createRequest({
                method: 'POST',
                url: '/',
                body: {
                  propertyToSanitize: "<script>hello</script> world"
                }
            });
            response = httpMocks.createResponse();
            done();
        });

        // Test the middleware
        it('Sanitizes <script> tag', function(done) {
            middleware()(request, response, function next(error) {
                if (error) { throw new Error('Expected not to receive an error'); }
                // Call the middleware function
                request.body.sanitized = request.sanitize(request.body.propertyToSanitize);
                // Assert result
                assert.equal(request.body.sanitized, " world");
                done();
            });
        });

    });
});
