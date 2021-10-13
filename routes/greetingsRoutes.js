module.exports = function GreetRoutes(greetings) {
    async function Home(req, res) {
        try {

            res.render('index', {

                counter: await greetings.counter()

            });
        } catch (error) {
            console.log(error)
        }
    }
    async function display(req, res) {
        try {
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
                await greetings.setLanguage(name, language);

                (language === language && name === name)
                req.flash('feedback', 'succefully greeted')
                    //  await greetings.insertName(name)
            }


            res.render('index', {
                names: await greetings.getName(),
                counter: await greetings.counter()

            })

        } catch (error) {
            console.log(error)
        }
    }
    async function NameLinks(req, res) {
        try {

            res.render('greeted', {
                greeted: await greetings.getData(),

            })
        } catch (error) {
            console.log(error)
        }
    }
    async function GreetedNames(req, res) {
        try {


            const username = req.params.user;
            const counters = await greetings.dataStored(username);

            const list = await greetings.Names()


            res.render('greetedNames', {
                count: counters.counter,
                userName: username,
                //  CounterName: list[username],
                //  CounterName1: list[username] == 1

            })

        } catch (error) {
            console.log(error);
        }
    }
    async function restBttn(req, res) {
        try {
            await greetings.clear();
            res.redirect('/')

        } catch (error) {
            console.log(error)
        }
    }
    return {
        Home,
        display,
        NameLinks,
        GreetedNames,
        restBttn
    }
}