const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});





/// ----- notes on the code -----------



// // to add public folder to client
// const path = require('path');
// const express = require('express');
// const routes = require('./controllers');
// const sequelize = require('./config/connection');

// const app = express();
// const PORT = process.env.PORT || 3001;

// //---set up handlebars as template engine of choice---
// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({});

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// //---end handlebars set up---

// //---to use express-session and sequelize store---
// const session = require('express-session');

// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const sess = {
//     secret: 'Super secret secret',
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//         db: sequelize
//     })
// };

// app.use(session(sess));
// //---end session and sequelize store setup---

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // add stylesheet to client / serve contents of public folder as static assets
// app.use(express.static(path.join(__dirname, 'public')));

// // turn on routes
// app.use(routes);

// // turn on connection to db and server
// // use alter: true to add a table not delete anything
// // use force: true to delete everything 
// // looks at everything in models folder 
// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
// });