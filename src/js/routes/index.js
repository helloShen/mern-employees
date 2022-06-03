import express from 'express';

const indexRouter = express.Router();

// Get home page
indexRouter.get('/', function(req, res) {
  console.log('Redirect to /record');
  res.redirect('/record');
});

export default indexRouter;
