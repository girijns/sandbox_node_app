const userService = require("../user_service");
module.exports = function(app, auth) {
  app.get('/', auth, (req, res) => {
     res.render("pages/home_auth", {name: req.session.user.firstname});
  });
  app.post('/authenticate', (req, res) => {
     const user = userService.authenticate(req.body);
     if(user) {
       console.log("authenticated " + user.username);
       req.session.user = user;
       res.redirect("/");
     } else {
       console.log("authentication failed " + req.body.username);
       res.redirect("/login");
     }
  });
  app.get('/about', (req, res) => {
     res.render("pages/about");
  });
  app.post('/register', (req, res) => {
     const user = {username:req.body.username,firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email,password:req.body.password};
     console.log("Registering user " + user.username);
     const status = userService.add(user);
     if("success" == status) {
        console.log("Registered user " + user.username);
        res.redirect("/login");
     } else {
        console.log("Registeration failed for user " + user.username);
        res.redirect("/register");
     }
  });
  app.get('/register', (req, res) => {
     req.session.destroy();
     res.clearCookie("sbox_user_sid");
     res.render("pages/register");
  });
  app.get('/logout', (req, res) => {
     req.session.destroy();
     res.clearCookie("sbox_user_sid");
     res.redirect("/");
  });
  app.get('/login', (req, res) => {
     req.session.destroy();
     res.clearCookie("sbox_user_sid");
     res.render("pages/login");
  });
};
