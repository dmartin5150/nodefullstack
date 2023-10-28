const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
require('./models/Users');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./services/passport');
mongoose.connect(keys.mongoURI);

const app = express();

app.use(cookieSession({
     maxAge: 30 *24 * 60 * 60 * 1000,
     keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());



require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);