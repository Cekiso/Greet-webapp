let express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const greet = require('./greet');
const greetings = greet();



let app = express();
const counter = 0;
// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));
// initialise the flash middleware
app.use(flash());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false

}));
// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {

    res.render('index', {
        names: greetings.getName(),
        counter: greetings.counter()


    });

});
app.post('/Greeting', function(req, res) {

    // const counter = 0;
    // counter(req.body.reset)
    // error message
    const name = req.body.person;
    var isNumeric = /^[A-Za-z]+$/;
    const test = isNumeric.test(name);

    if (!test) {
        req.flash('error', "Letters are required");
    } else if (name == "") {
        req.flash('error', 'Name is required');
    } else {
        greetings.setLanguage(req.body.person, req.body.language)

    }
    res.redirect('/')
})


//display the name links
app.get('/greeted', function(req, res) {
    res.render('greeted', {
            greeted: greetings.Names(),

        })
        // console.log(greetings.Names())
})


//display the name list
app.get('/greeted/:user', function(req, res) {
    const username = req.params.user;
    const list = greetings.Names();


    res.render('greetedNames', {
        userName: username,
        CounterName: list[username],
        CounterName1: list[username] == 1
    })
})



let PORT = process.env.PORT || 3020;

app.listen(PORT, function() {
    console.log('App starting on port', PORT);
});