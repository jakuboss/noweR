if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser')
const mongoClient = require('mongo-client')
const methodOverride = require('method-override')
const app = express();
const User = require('./models/User');
const $ = require('jquery');
const {
  forwardAuthenticated,
  ensureAuthenticated,
  authenticationRole,

} = require('./config/auth');
const {
  ROLE
} = require('./data.js')

//set the path of the jquery file to be used from the node_module jquery package
app.use('/jquery', express.static(path.join(__dirname + '/node_modules/jquery/dist/')));


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

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes

app.use(function (req, res, next) {
  res.locals.user = req.user
  // res.locals.authenticated = !req.user.anonymous
  next()
})

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


app.use('/profile', ensureAuthenticated, require('./routes/profile.js'))

app.use('/productForm', require('./routes/taskroute.js'));


app.use(methodOverride('_method'))



app.use('/administration', ensureAuthenticated, require('./routes/administration'))



app.use('/products', ensureAuthenticated, authenticationRole(ROLE.ADMIN), require('./routes/product'))

// app.use('/roles', require('./routes/roles'))



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));