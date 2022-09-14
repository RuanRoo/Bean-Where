let expect = require('chai').expect;
let request = require('request');

describe('Status', function() {
describe ('posts', function() {
it('status', function(done){
request('/api/posts/',
function(error, response, body) {
expect(response.status).to.equal(200);
done();
});
});
});
});