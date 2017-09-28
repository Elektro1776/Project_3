
import express from 'express';
import { renderPage } from '../../../client/renderers/server';

const router = express.Router();
let initalContent;
router.get('/', (req, res) => {
  console.log(' ARE WE HITTING THIS ROUTE?', req.url);
  initalContent = renderPage(req);
  res.render('index', { initalContent });
});

router.get('/dashboard', (req, res) => {
  res.render('index', {});
});

router.get('/about', (req, res) => {
  console.log(' ARE WE HITTING ABOUT ?', req.url);
  initalContent = renderPage(req);
  res.render('index', { initalContent });
});

router.get('/resources', (req, res) => {
  res.render('index', {});
});
module.exports = router;
