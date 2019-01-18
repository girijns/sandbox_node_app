const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cfg = require('./config/app_cfg');

const app = express();
app.set('view engine','ejs');
app.use(session({
    key: "sbox_user_sid",
    secret: cfg.session_salt,
    resave: false,
    saveUninitialized: false
}));

const port = 8000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    if (!req.session.user && req.cookies && req.cookies.sbox_user_sid) {
        res.clearCookie('sbox_user_sid');        
    }
    next();
});
const auth = function(req, res, next) {
  if (req.session && req.session.user)
    return next();
  else
    return res.render('pages/home');
};
require('./app/routes')(app,auth);
app.listen(port, () => {
  console.log('Listening on ' + port);
});
