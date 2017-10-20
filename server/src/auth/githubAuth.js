require('dotenv').config();

import express from 'express';
// const GitHubStrategy = require('passport-github2').Strategy;
// const github = require('./ghkey.js') || null;
// const orm = require('../db/orm');
import request from 'request';
import qs from 'querystring';

const githubAuthRouter = express.Router();
const DEV = process.env.NODE_ENV === 'development';
let client_id;
let client_secret;
if (DEV) {
  client_id = process.env.GITHUB_CLIENT_ID;
  client_secret = process.env.GITHUB_CLIENT_SECRET;
} else {
  client_id = process.env.PROD_GITHUB_CLIENT_ID;
  client_secret = process.env.PROD_GITHUB_CLIENT_SECRET;
}
console.log(' WHAT IS THE CLIENT ID?', client_id, process.env.GITHUB_CLIENT_ID);
githubAuthRouter.get('/auth/github', (req, res, next) => {
  console.log(' We hit our github route', req.headers);
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    // 'Access-Control-Allow-Headers': ''
  })

  // res.redirect(301, 'http://google.com');

  // res.redirect(`https://github.com/login/oauth/authorize?scope=user:email&client_id=${client_id}`)
  // next()
  res.json(JSON.stringify({ url: `https://github.com/login/oauth/authorize?scope=user:email&client_id=${client_id}` }))
  // request(`https://github.com/login/oauth/authorize?scope=user:email&client_id=${client_id}`);
});

githubAuthRouter.get('/auth/github/callback', (req, res, next) => {
  // console.log(' WHAT ARE THE KEYS ON THE REQ NOW ???', req.query);
  const oauth = {
    client_id,
    client_secret
  }
  const session_code = req.query.code;
  let access_token;
  request(`https://github.com/login/oauth/access_token?code=${session_code}&client_id=${client_id}&client_secret=${client_secret}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // Authorization: `Bearer ${secrets}`,
    },
  }, (err, response, body) => {
    // console.log(' DO WE GET ANYTHING???????:::::::::', response.statusMessage);
    // console.log('ERRRRR', err);
    // console.log('RESPONSEEEE', Object.keys(response));
    // console.log('BODYYYYYY', qs.parse(body));
    // const what = body;
    // console.log(' WHAT IS THE BODY??', body.toJSON());

    // console.log(' DO WE HAVE A REQ USER HER????', req.user);
    // res.locals.github_token = body
    // res.redirect(301, '/')
    // next();
    access_token = qs.parse(body);
    req.session.github_token = access_token;
    // res.sendStatus(200);
    next();
    res.redirect(301, '/');
  });
});

export default githubAuthRouter;
