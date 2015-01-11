/**
 * Created by Franz on 1/11/2015.
 *
 * The purpose of Defer is to provide a promise usable either on the browser (via angular) or within node for APIs
 * that are developed to work on both.
 *
 * On the browser, internally uses angular.$q.  In node implemented by node-promise; therefore clients of may
 * implement their usual client side code transparently.
 *
 */

(function (exports) {
  'use strict';

  // Detect node or browser.  Since this is purposefully intended for angular, we look for the angular global.
  var browser = typeof angular === 'object';
  var defer;
  if (browser) {
    var $injector = angular.injector(['ng']);
    var $q = $injector.get('$q', 'FullStackPromise');
    defer = $q.defer;
  } else {
    defer = require('node-promise').defer;
  }
  exports.defer = defer;

})(typeof exports === 'undefined' ? (this.bsh ? this.bsh : this.bsh = {}) : exports); // i.e. in a browser it's implemented as window.bsh.FullStackPromise

