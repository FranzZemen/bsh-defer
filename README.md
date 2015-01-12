Installation (node):

    npm install bsh-defer --save

Installation (bower):

    bower install bsh-defer --save


This module's purpose is to provide a promise usable either in angular or node.  It is
a very trivial module, but helps simplify common apis a little.

When writing pomise based js APIs that are intended for delivery both to angular or node,
it is convenient to use a common wrapper for $q and a node based promise library (in
this case node-promise is used).

Usage:

Defining your common angular/node api:

    (function (exports) {
        'use strict';

        var browser = typeof angular === 'object';
        var defer = browser ? window.bsh.defer : require ('bsh-defer').defer;

        function someApi () {
            var deferred = defer();

            // ... code possibly asynchronous...success condition
            if (success) {
                deferred.resolve(someValue);
            }
            // ... code possibly asynchronous...error condition
            if (err) {
                deferred.reject(err);
            }
            return deferred.promise;
        }

        exports.someApi = someApi;
    })(typeof exports === 'undefined' ? (this.bsh ? this.bsh : this.bsh = {}) : exports);


Usage somewhere else in angular or node:

    // Node:
    require('some api path').someApi().then (
        function success(val) {
        },
        function failure(err) {
        }
    );

    // Angular:  note that the first line could also read bsh.someAi().then{
    // since the global window is implicity
    window.bsh.someApi().then(
        function success(val) {
        },
        function failure(err) {
        }
    );
