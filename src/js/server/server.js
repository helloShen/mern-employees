import http from 'http';
// import DebugModule from 'debug';
import dotenv from 'dotenv';
import app from '../app.js';
import conn from '../db/db.js';

dotenv.config({
  path: './config.env',
});

// Get port from environment and store in express.
const port = process.env.PORT || 5000;
app.set('port', port);

// Create and run the server
app.listen(port, () => {
  // perform a database connection when server starts.
  console.log(`Server is running on port: ${port}`);
  const db = conn();
  console.log('Connected to MongoDB');
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = (typeof port === 'string') ?
    'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(bind + ' is already in use');
    process.exit(1);
    break;
  default:
    throw error;
  }
}
