module.exports = function greet(existingNamesAlready) {



    var namesObject = {};

    var isNumeric = /^[A-Za-z]+$/;
    //var greetErrors = document.querySelector(".errors")
    var message = "";



    function setLanguage(name, language) {
        setName(name)
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
    }

    function getName() {
        return message;
    }

    function setName(name) {

        // if (!nameList.includes(name.toUpperCase()) && name != "") {
        //     nameList.push(name.toUpperCase());
        // } else {
        //     message;
        // }
        if (namesObject[name] === undefined) {
            namesObject[name] = 1
        } else {
            namesObject[name]++
        }

    }


    //create a function for the counter: return the length of the list
    function counter() {
        var namesList = Object.keys(namesObject);

        return namesList.length;

    }

    //create a function that returns all the name in the list 
    function Names() {
        return namesObject;

    }

    // function errorHandling(lang, name) {

    //     //let message = [];
    //     if (lang == null && name == "") {

    //         message = greetErrors.innerHTML = "please enter name and choose language";
    //     } else if (name == "") {

    //         message = greetErrors.innerHTML = 'Name is required';
    //         //setTimeout(function(){ greetErrors.value = "Name is required" }, 2000);
    //     } else if (lang == null) {
    //         message = greetErrors.innerHTML = "please select language";
    //     }
    //     if (!isNumeric.test(name)) {
    //         message = greetErrors.innerHTML = "Letters are required";
    //     }
    // }

    function errorHandlingtest(lang, name) {

        //let message = [];

        if (name == "") {

            message = 'Name is required';
            //setTimeout(function(){ greetErrors.value = "Name is required" }, 2000);
        } else if (!isNumeric.test(name)) {
            return "Letters are required";
        }

    }


    return {
        setName,
        counter,
        // errorHandling,

        // storingCounter,
        getName,
        setLanguage,
        //errorHandling,
        Names,
        errorHandlingtest






    }

}