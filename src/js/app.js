'use strict';

require('helpers/shims');

var _exampleModule = require('modules/example-module');

function init () {

    _exampleModule.init();
}

document.addEventListener('DOMContentLoaded', init);