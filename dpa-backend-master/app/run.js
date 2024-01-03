require('dotenv-safe').config();
const env = require('./config/environment');

require('./server/server')((app) => {
  app.set('port', env.app.port);
  app.listen(app.get('port'), () => {
    console.log(`Server running on ${app.get('port')}`);
  });
});
