'use strict';

function ExampleModule () {

    function _add (num1, num2) {

        var result;

        if (typeof num1 === 'number' && typeof num2 === 'number')
        {
            result = num1 + num2;
        }
        else
        {
            result = 0;
        }

        return result;
    }

    this.add = _add;
}

ExampleModule.prototype.init = function () {

    this.exampleProp1 = 'Hello!';
    this.exampleProp2 = 123;
};

module.exports = new ExampleModule();