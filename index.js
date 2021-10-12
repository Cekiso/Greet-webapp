let express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const greet = require('./greet');
const routes = require('./routes/greetingsRoutes')
const pg = require('pg');
const Pool = pg.Pool;

let app = express();

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
// const connectionString = process.env.DATABASE_URL || 'postgresql://nkully:nkully@localhost:3090/users';
const connectionString = process.env.DATABASE_URL || 'postgresql://nkully:nkully@localhost:5432/users';


const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }

});
const greetings = greet(pool);
const route = routes(greetings)
console.log(pool)

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",

    resave: false,
    saveUninitialized: true
}));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false

}));

// parse application/json
app.use(bodyParser.json())

// initialise the flash middleware
app.use(flash());


//Home page
app.get('/', route.Home);


//display
app.post('/Greeting', route.display);


//display the name links
app.get('/greeted', route.NameLinks);


app.get('/greeted/:user', route.GreetedNames);


//reset button
app.post('/reset', route.restBttn);

let PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log('App starting on port', PORT);
});