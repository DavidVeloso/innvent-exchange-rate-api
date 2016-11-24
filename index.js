import config from './config/env';
import app from './config/express';

const debug = require('debug')('innvent-exchange-rate-api:index');

// listen on port config.port
app.listen(config.port, () => {
  debug(`server started on port ${config.port} (${config.env})`);
});

export default app;
