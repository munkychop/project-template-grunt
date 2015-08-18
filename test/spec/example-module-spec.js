module.exports = (function () {
    'use strict';
    
    var exampleModule = require('modules/example-module');

    describe('Example Module', function() {

        before(function() {
            exampleModule.init();
        });

        it('should have a method named "add"', function() {
            expect(exampleModule.add).to.be.a('function');
        });

        it('should have a property named "exampleProp1" of type string', function() {
            expect(exampleModule.exampleProp1).to.be.a('string');
        });

        it('should have a property named "exampleProp2" of type number', function() {
            expect(exampleModule.exampleProp2).to.be.a('number');
        });

        describe('add()', function() {
            it('should return 10 when passed 2 and 8 as parameters', function() {
                expect(exampleModule.add(2, 8)).to.equal(10);
            });

            it('should return 0 when passed a non-numeric value for the first parameter', function() {
                expect(exampleModule.add(2, 'hello')).to.equal(0);
            });

            it('should return 0 when passed a non-numeric value for the second parameter', function() {
                expect(exampleModule.add('hello', 5)).to.equal(0);
            });

            it('should return 0 when passed non-numeric values for both parameters', function() {
                expect(exampleModule.add('hello', 'there')).to.equal(0);
            });
        });

        describe('exampleProp1', function() {
            it('should be "Hello!"', function() {
                expect(exampleModule.exampleProp1).to.equal('Hello!');
            });
        });

        describe('exampleProp2', function() {
            it('should be 123', function() {
                expect(exampleModule.exampleProp2).to.equal(123);
            });
        });
    });
})();