if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}
//wymagane moduy/biblioteki
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override')
const app = express();
const $ = require('jquery');
const {
  ensureAuthenticated,
  authenticationRole,
} = require('./config/auth');
const {
  ROLE
} = require('./data.js')

app.use(express.json())
app.use(express.static('public'));
app.set('layout', 'layouts/layout') //
app.set('views', __dirname + '/views')
require('./config/passport')(passport);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({
  extended: true
}));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Zmienne globalne
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user;
  next();
});

//Routing
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

app.use('/profile', ensureAuthenticated, require('./routes/profile.js'))

app.use('/productForm', ensureAuthenticated, require('./routes/taskroute.js'));

app.use(methodOverride('_method'))

app.use('/administration', ensureAuthenticated, authenticationRole([ROLE.ADMIN]), require('./routes/administration'))

app.use('/products', ensureAuthenticated, require('./routes/product'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));