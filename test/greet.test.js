let assert = require("assert");
let greet = require("../greet");


describe('greet function', function() {
    describe('It should be able to greet the user in three different languages', function() {

        it('It should greet the user in IsiZulu', function() {
            let testingGreet = greet();
            testingGreet.setName('Nkuli');
            assert.notEqual(testingGreet.setLanguage('Nkuli', 'IsiZulu'), 'Sawubona Nkuli');
            testingGreet.setName('Luvo');
            assert.notEqual(testingGreet.setLanguage('Luvo', 'IsiZulu'), 'Sawubona Luvo');
        });
        it('It should greet the user in IsiXhosa', function() {
            let testingGreet = greet();
            testingGreet.setName('Xolie')
            assert.notEqual(testingGreet.setLanguage('Xoli', 'IsiXhosa'), 'Molo Xoli');
            testingGreet.setName('Lusa')
            assert.notEqual(testingGreet.setLanguage('Lusa', 'IsiXhosa'), 'Molo Lusa');

        });
        it('It should greet the user in English', function() {
            let testingGreet = greet();
            testingGreet.setName('Ntsika')
            assert.notEqual(testingGreet.setLanguage('Ntsika', 'English'), 'Hello Ntsika');
            testingGreet.setName('Sikelela')
            assert.notEqual(testingGreet.setLanguage('Sikelela', 'English'), 'Hello Sikelela');
        });
    });
});
describe('should be able to keep track of the names that are greeted', function() {
    it('should be able to track all the user names', function() {
        let testingGreet = greet();
        testingGreet.setName('Nkuli', 'IsiXhosa');
        testingGreet.setName('Sam', 'IsiXhosa');
        assert.ok(testingGreet.Names(), ['NKULI', 'SAM']);


    });
    it('should be able to count each user greeted once even if greeted in different languages', function() {
        let testingGreet = greet();
        testingGreet.setName('Nkuli', 'Isizulu');
        testingGreet.setName('Nkuli', 'English');
        testingGreet.setName('Nkuli', 'IsiXhosa');


    });
    it('should be able to count each user greeted once', function() {
        let testingGreet = greet();
        testingGreet.setName('NKULI')
        testingGreet.setName('nkuli')
        testingGreet.setName('Nkuli')
        assert.ok(testingGreet.counter(), 1);
    });
});
describe('should be able to test counter', function() {
    it('should increment the counter when a new name is greeted', function() {
        let testingGreet = greet();
        testingGreet.setName('Luyanda');
        testingGreet.setName('Nkuli');
        testingGreet.setName('Luvo');

        assert.equal(testingGreet.counter(), 3);


    });
    it('should be able to clear the counter', function() {
        let testingGreet = greet();
        assert.equal(testingGreet.counter(), 0);
    });
});
describe('It should be able to show errors', function() {

    it('It should return an error if name is not entered', function() {
        let testingGreet = greet();

        assert.notEqual(testingGreet.errorHandlingtest('IsiZulu', ''), 'Name is required');

    });



});