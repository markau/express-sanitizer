const assert = require("assert");
const middleware = require("../lib/express-sanitizer");

const express = require('express');
const supertest = require('supertest');
const expect = require('expect');

// Unit tests
let httpMocks = require('node-mocks-http');
let mockRequest = {};
let mockResponse = {};
// Integration tests
const app = express();
let server = {};

describe('express-sanitizer test suite', function(){

    context('Unit tests', function() {

        // Setup
        beforeEach(function(done) {
            mockRequest = httpMocks.createRequest({
                method: 'POST',
                url: '/',
                body: {
                  propertyToSanitize: "<script>hello</script> world"
                }
            });
            mockResponse = httpMocks.createResponse();
            done();
        });

        // Test
        it('should sanitize string with <script> tag', function(done) {
            middleware()(mockRequest, mockResponse, function next(error) {
                if (error) { throw new Error('Expected not to receive an error'); }
                // Call the middleware function
                mockRequest.body.sanitized = mockRequest.sanitize(mockRequest.body.propertyToSanitize);
                // Assert result
                assert.equal(mockRequest.body.sanitized, " world");
                done();
            });
        });

    }); // end unit

    context('Integration tests', function() {

        // Setup
        beforeEach(function(done) {
            app.use(express.json());
            app.use(middleware());
            app.post('/', function(req, res, next) {
                // replace an HTTP posted body property with the sanitized string
                const sanitizedString = req.sanitize(req.body.propertyToSanitize);
                // send the response -- res.body.sanitized = " world"
                res.send({ sanitized: sanitizedString });
            });
            server = app.listen(3000)
            done();
        });

        // Test
        it('should sanitize request body containing <script> tag', function(done) {
            supertest(app)
              .post('/')
              .send({
                propertyToSanitize: "<script>hello</script> world"
              })
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
              .expect(200)
              .end(function (err, res) {
                if (err) throw err;
                expect(res.body.sanitized).toBe(" world");
                done();
              });
          });

          afterEach(function(){
            server.close();
          });

    }); // end integration

});
