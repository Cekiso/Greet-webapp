 let express = require('express');
 const exphbs = require('express-handlebars');
 const bodyParser = require('body-parser');
 const flash = require('express-flash');
 const session = require('express-session');
 const greet = require('./greet');

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
 const connectionString = process.env.DATABASE_URL || 'postgresql://nkully:nkully@localhost:5432/users';

 const pool = new Pool({
     connectionString: connectionString,
     ssl: {
         rejectUnauthorized: false
     }

 });
 const greetings = greet(pool);
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


 app.get('/', async function(req, res) {


     res.render('index', {

         counter: await greetings.counter()

     });

 });


 app.post('/Greeting', async function(req, res) {


     try {
         var counter = await greetings.counter()

         const name = req.body.person;
         const language = req.body.language;

         var isNumeric = /^[A-Za-z]+$/;
         const test = isNumeric.test(name);

         if (name == "") {
             req.flash('error', 'Name is required');
         } else if (!test) {
             req.flash('error', "Letters are required");
         } else if (language == null) {
             req.flash('error', 'please select language');
         } else {
             await greetings.setLanguage(name, language)

             //  await greetings.insertName(name)
         }

         res.render('index', {
             names: await greetings.getName(),
             counter: await greetings.counter()

         })

     } catch (error) {
         next(error)
     }
 })


 //display the name links
 app.get('/greeted', async function(req, res) {
     var name = await greetings.getData()
     res.render('greeted', {
         greeted: await greetings.getData(),

     })

 })


 //display the name list and counter
 app.get('/greeted/:user', async function(req, res) {

     try {


         const username = req.params.user;
         const counters = await greetings.dataStored(username);

         const list = greetings.Names()


         res.render('greetedNames', {
             count: counters.counter,
             userName: username,
             //  CounterName: list[username],
             //  CounterName1: list[username] == 1

         })

     } catch (error) {
         //  console.log(error);
     }
 });
 app.post('/reset', async function(req, res) {
     try {
         await greetings.clear();
         res.redirect('/')

     } catch (error) {
         console.log(error)
     }
 })

 let PORT = process.env.PORT || 3030;

 app.listen(PORT, function() {
     console.log('App starting on port', PORT);
 });