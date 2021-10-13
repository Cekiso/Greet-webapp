const assert = require("assert");
const greet = require("../greet");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://nkully:nkully@localhost:5432/users';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function() {

    beforeEach(async function() {
        await pool.query("DELETE FROM greetings;");

    });


    // should be able to insect names 

    it('should increment the counter when a new different name is greeted', async function() {
        let testingGreet = greet(pool);
        await testingGreet.insertName({
            name: "Nkuli",
            name: "Sino",
            name: "lulu"
        });
        let users = await testingGreet.getData()
        assert.equal(1, users.length)

    });

    it('should increment the counter when a new name is greeted', async function() {
        let testingGreet = greet(pool);
        await testingGreet.insertName({
            name: "Xoli"
        })
        let users = await testingGreet.getData()
        assert.equal(1, users.length)


    });
    it('should be able to count each user greeted once', async function() {
        let testingGreet = greet(pool);
        await testingGreet.insertName({
            name: "Ntsika",
            name: "ntsika",
            name: "NTSIKA"
        })
        let users = await testingGreet.getData()
        assert.equal(1, users.length)

    });



    it('It should greet the user in IsiXhosa', async function() {
        let testingGreet = greet(pool);

        await testingGreet.setLanguage('Xoli', 'IsiXhosa')
        assert.equal('Molo Xoli', await testingGreet.getName());


    });
    it('It should greet the user in IsiZulu', async function() {
        let testingGreet = greet(pool);

        await testingGreet.setLanguage('Nomzamo', 'IsiZulu')
        assert.equal('Sawubona Nomzamo', await testingGreet.getName());


    });
    it('It should greet the user in English', async function() {
        let testingGreet = greet(pool);

        await testingGreet.setLanguage('Sam', 'English')
        assert.equal('Hello Sam', await testingGreet.getName());


    });

    it('should be able to track all the user names', async function() {
        let testingGreet = greet(pool);
        await testingGreet.setLanguage('Nkuli', 'IsiXhosa');
        await testingGreet.setLanguage('Sam', 'English');

        assert.equal('Hello Sam', await testingGreet.getName())



    });

    it('if a name has been greeted twice it must return 2', async function() {
        let testingGreet = greet(pool);

        await testingGreet.insertName('Nkuli', 'English');
        await testingGreet.insertName('Nkuli', 'IsiXhosa');

        let count = await testingGreet.dataStored('Nkuli')
        assert.equal(2, count.counter)



    });
    it('should be able to reset the app', async function() {
        let testingGreet = greet(pool);
        await testingGreet.insertName('NKULI');
        await testingGreet.insertName('nkuli ');
        await testingGreet.insertName('Nkuli');

        let Clearing = await testingGreet.clear();
        assert.equal(null, Clearing)
    });


    // it('should increment the counter when a new name is greeted', async function() {
    //     let testingGreet = greet(pool);
    //     await testingGreet.insertName('Luyanda');
    //     await testingGreet.insertName('Nkuli');
    //     await testingGreet.insertName('Luvo');

    //     assert.ok(testingGreet.counter(), 3);


    // });
    after(function() {
        pool.end();
    })
});