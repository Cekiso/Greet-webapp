let express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greet = require('./greet');
const greetings = greet();



let app = express();
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
        setLanguage: greetings.setLanguage(),
        counter: greetings.counter()
    });
    //console.log(greetings.setLanguage())
});
app.post('/Greeting', function(req, res) {

    const name = req.body.person;
    const languages = req.body.language;

    greetings.setName(name)
        //greetings.setLanguage(name, languages)
    greetings.setLanguage({
        names: req.body.person,
        language: req.body.language,


    })


    //console.log(greetings.setLanguage(name, languages))
    res.redirect('/')
})


let PORT = process.env.PORT || 3020;

app.listen(PORT, function() {
    console.log('App starting on port', PORT);
});