// const { query } = require("express");

module.exports = function greet(anything) {



    // var namesObject = {};

    var isNumeric = /^[A-Za-z]+$/;
    //var greetErrors = document.querySelector(".errors")
    var message = "";
    var pool = anything;

    // A function that insert name and counter
    async function insertName(name) {
        const sql = await pool.query(`SELECT * FROM greetings WHERE name = $1`, [name]);

        if (sql.rows.length == 0) {
            await pool.query(`insert into greetings (name,counter) values ($1, $2)`, [name, 1])
        } else {
            await pool.query(`UPDATE greetings SET counter = counter +1 WHERE name = $1`, [name])
        }
    }

    async function getData() {
        const getSql = await pool.query(`SELECT * FROM greetings`)
        return getSql.rows;
    }

    async function setLanguage(name, language) {
        try {
            insertName(name)
            if (name == "" || !isNumeric.test(name)) {
                message = null;
            }
            if (language == "IsiXhosa" && name != "") {
                message = "Molo " + name;

            } else if (language == "English" && name != "") {
                message = "Hello " + name;
            } else
            if (language == "IsiZulu" && name != "") {
                message = "Sawubona " + name;
            } else {
                message = '';
            }

        } catch (error) {
            console.log(error)
        }
    }
    async function remove() {
        message = null;
    }

    function getName() {
        return message;
    }


    //create a function for the counter: return the length of the list
    async function counter() {
        try {
            var namesList = await pool.query(`SELECT count (*) FROM greetings`)
            return namesList.rows[0].count;

        } catch (error) {
            console.log(error)
        }
    }

    //create a function that returns all the name in the list 

    async function Names() {
        // var namesObject = await pool.query(`SELECT name FROM greetings`)
        // return namesObject.rows;

    }
    //create a function that will loop through my database name and select the name greeted
    async function dataStored(name) {
        try {
            var greet = await pool.query(`SELECT * FROM greetings WHERE name = $1`, [name])
            if (name) {
                var store = {};
            }
            for (let i = 0; i < greet.rows.length; i++) {
                store["name"] = greet.rows[i].name;
                store["counter"] = greet.rows[i].counter;
            }
            if (store == name) {
                store = greet.rows[i]
            }

            return store
        } catch (error) {
            console.log(error)
        }
    }

    // function errorHandlingtest(language, name) {

    //     //let message = [];

    //     if (name == "") {

    //         message = 'Name is required';
    //         // setTimeout(function() { greetErrors.value = "Name is required" }, 2000);

    //     } else if (!isNumeric.test(name)) {
    //         message = "Letters are required";
    //     } else if (language == null) {
    //         message = "please select language";
    //     }



    // }


    //delete button
    async function clear() {
        try {
            await pool.query(`DELETE FROM greetings`);
        } catch (error) {
            console.log(error)
        }

    }

    return {

        counter,
        insertName,
        getData,

        clear,
        getName,
        setLanguage,

        Names,
        dataStored,
        remove

    }

}