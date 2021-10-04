let assert = require("assert");
let greet = require("../greet");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://nkully:nkully@localhost:5432/greetings_tests';
const pool = new Pool({
    connectionString
});
describe('The basic database web app', function() {

    beforeEach(async function() {
        console.log("*****");
        await pool.query("delete from greetings;");

    });




    it('It should greet the user in IsiZulu', async function() {
        let testingGreet = greet(pool);
        await testingGreet.insertName('Nkuli');
        assert.ok(testingGreet.setLanguage('Nkuli', 'IsiZulu'), 'Sawubona Nkuli');
        await testingGreet.insertName('Luvo');
        assert.ok(testingGreet.setLanguage('Luvo', 'IsiZulu'), 'Sawubona Luvo');
    });
    it('It should greet the user in IsiXhosa', async function() {
        let testingGreet = greet(pool);
        await testingGreet.insertName('Xolie')
        assert.ok(testingGreet.setLanguage('Xoli', 'IsiXhosa'), 'Molo Xoli');
        await testingGreet.insertName('Lusa')
        assert.ok(testingGreet.setLanguage('Lusa', 'IsiXhosa'), 'Molo Lusa');

    });
    it('It should greet the user in English', async function() {
        let testingGreet = greet(pool);
        await testingGreet.insertName('Ntsika')
        assert.ok(testingGreet.setLanguage('Ntsika', 'English'), 'Hello Ntsika');
        await testingGreet.insertName('Sikelela')
        assert.ok(testingGreet.setLanguage('Sikelela', 'English'), 'Hello Sikelela');
    });



    it('should be able to track all the user names', async function() {
        let testingGreet = greet(pool);
        await testingGreet.insertName('Nkuli', 'IsiXhosa');
        await testingGreet.insertName('Sam', 'IsiXhosa');
        assert.ok(testingGreet.Names(), ['NKULI', 'SAM']);


    });
    it('should be able to count each user greeted once even if greeted in different languages', async function() {
        let testingGreet = greet(pool);
        await testingGreet.insertName('Nkuli', 'Isizulu');
        await testingGreet.insertName('Nkuli', 'English');
        await testingGreet.insertName('Nkuli', 'IsiXhosa');
        assert.ok(testingGreet.counter(), 1)


    });
    it('should be able to count each user greeted once', async function() {
        let testingGreet = greet(pool);
        await testingGreet.insertName('NKULI')
        await testingGreet.insertName('nkuli ')
        await testingGreet.insertName('Nkuli')
        assert.ok(testingGreet.counter(), 1);
    });


    it('should increment the counter when a new name is greeted', async function() {
        let testingGreet = greet(pool);
        await testingGreet.insertName('Luyanda');
        await testingGreet.insertName('Nkuli');
        await testingGreet.insertName('Luvo');

        assert.ok(testingGreet.counter(), 3);


    });
    it('should be able to clear the counter', function() {
        let testingGreet = greet();

        assert.ok(testingGreet.counter(), 0);
    });



    it('It should return an error if name is not entered', function() {
        let testingGreet = greet();

        assert.notEqual(testingGreet.errorHandlingtest('IsiZulu', ''), 'Name is required');

    });
    after(function() {
        pool.end();
    });
});