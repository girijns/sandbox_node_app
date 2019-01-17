const sbxRoutes = require('./sbx_routes');
module.exports = function(app,auth) {
  sbxRoutes(app,auth);
  // Other route groups could go here, in the future
};
