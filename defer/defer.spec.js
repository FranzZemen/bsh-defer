/**
 * Created by Franz on 1/11/2015.
 *
 * Test with mocha on node.  Test with karma (configured with should) on browser
 */
'use strict';

describe('defer', function () {
    var should, defer;
    var browser = typeof angular === 'object';

    beforeEach(function () {
        if (browser) {
            defer = window.bsh.defer;
            should = window.Should;
        } else {
            defer = require ('./defer').defer;
            should = require ('should');
        }
    });

    function someFunc(succeed) {
        var deferred = defer();
        if (succeed) {
            if (browser) {
                deferred.notify('Update');
            }
            deferred.resolve('Success');
        } else {
            deferred.reject(new Error('Failed'));
        }
        return deferred.promise;
    }

    it('should provide and resolve a promise, with an update notification', function (done) {
        var promise = someFunc(true);
        should.exist(promise);
        promise.then(function (val) {
            should.exist(val);
            val.should.be.equal('Success');
            done();
        }, function (err) {
            should.not.exist(err);
            done();
        }, function (notification) {
            should.exist(notification);
            notification.should.equal('Update');
            done();
        });
    });
    it('should provide and reject a promise', function (done) {
        var promise = someFunc(false);
        should.exist(promise);
        promise.then(function (val) {
            should.not.exist(val);
            done();
        }, function (err) {
            should.exist(err);
            err.message.should.be.equal('Failed');
            done();
        });
    });
});


