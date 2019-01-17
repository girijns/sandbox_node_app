module.exports = function(app, auth) {
  app.get('/', auth, (req, res) => {
     res.render("home_auth", {name: "Authorized visitor"});
  });
  app.get('/login', (req, res) => {
     req.session.user = "giri";
     res.redirect("/");
  });
  app.get('/logout', (req, res) => {
     req.session.destroy();
     res.clearCookie("sbox_user_sid");
     res.redirect("/");
  });
};
