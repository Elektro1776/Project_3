const express = require('express');
const request = require('request');

const router = express.Router();

// Get repos for a user
router.post('/api/github/getRepos', (req, res) => {
  //  console.log(req.body);
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'GET',
    json: true,
    url: `https://api.github.com/users/${req.body.id}/repos?sort=updated`,
  }, (err, response, body) => {
    console.log(' WHAT IS THE BODY?', body);
  });
});

// Get issues
router.post('/api/github/getIssues', (req, res) => {
  //  console.log(req.body);
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'GET',
    json: true,
    url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/issues`,
  }, (err, response, body) => {
    console.log(' WHAT IS THE BODY?', body);
  });
});

// Get comments from a specific issue
router.post('/api/github/getIssueComments', (req, res) => {
  //  console.log(req.body);
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'GET',
    json: true,
    url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/issues/${req.body.number}/comments`,
  }, (err, response, body) => {
    console.log(' WHAT IS THE BODY?', body);
  });
});

// Get Collaborators
router.post('/api/github/getCollaborators', (req, res) => {
  //  console.log(req.body);
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'GET',
    json: true,
    url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/collaborators?access_token=${req.user.github.token}`,
  }, (err, response, body) => {
    console.log(' WHAT IS THE BODY?', body);
  });
});

// Get all pull requests
router.post('/api/github/getPulls', (req, res) => {
  //  console.log(req.body);
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'GET',
    json: true,
    url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/pulls`,
  }, (err, response, body) => {
    console.log(' WHAT IS THE BODY?', body);
  });
});

// Create an issue
router.post('/api/github/createIssue', (req, res) => {
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'POST',
    json: true,
    url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/issues?access_token=${req.user.github.token}`,
    body: { title: req.body.title,
      body: req.body.body,
      assignees: req.body.assignees },
  }, (err, response, body) => {
    console.log(' WHAT IS THE BODY?', body);
  });
});

// Create a pull request
router.post('/api/github/createPullRequest', (req, res) => {
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'POST',
    json: true,
    url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/pulls?access_token=${req.user.github.token}`,
    body: { title: req.body.title,
      head: req.body.head,
      base: req.body.base,
      body: req.body.body },
  }, (err, response, body) => {
    console.log(' WHAT IS THE BODY?', body);
  });
});

// Create pull request comment
router.post('/api/github/createPullRequestComment', (req, res) => {
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'POST',
    json: true,
    url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/pulls/${req.body.number}/comments?access_token=${req.user.github.token}`,
    body: { body: req.body.body,
      commit_id: req.body.commit_id,
      path: req.body.path,
      position: req.body.position }, // position must be passed as an integer
  }, (err, response, body) => {
    console.log(' WHAT IS THE BODY?', body);
  });
});

// Add assignees to issues
router.post('/api/github/addAssignees', (req, res) => {
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'POST',
    json: true,
    url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/issues/${req.body.number}/assignees?access_token=${req.user.github.token}`,
    body: { assignees: req.body.assignees },
  }, (err, response, body) => {
    console.log(' WHAT IS THE BODY?', body);
  });
});

// Add collaborator
router.post('/api/github/addCollaborator', (req, res) => {
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'PUT',
    json: true,
    url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/collaborators/${req.body.username}?access_token=${req.user.github.token}`,
  }, (err, response, body) => {
    console.log(' WHAT IS THE BODY?', body);
  });
});

// Create comment on issue
router.post('/api/github/createIssueComment', (req, res) => {
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'POST',
    json: true,
    url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/issues/${req.body.number}/comments?access_token=${req.user.github.token}`,
    body: { body: req.body.body },
  }, (err, response, body) => {
    console.log(' WHAT IS THE BODY?', body);
  });
});

// Edit an issue
router.post('/api/github/editIssue', (req, res) => {
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'PATCH',
    json: true,
    url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/issues/${req.body.number}?access_token=${req.user.github.token}`,
    body: { title: req.body.title,
      body: req.body.body,
      assignees: req.body.assignees },
  }, (err, response, body) => {
    console.log(' WHAT IS THE BODY?', body);
  });
});

// Remove a Collaborator
router.post('/api/github/removeCollaborator', (req, res) => {
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'DELETE',
    json: true,
    url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/collaborators/${req.body.username}?access_token=${req.user.github.token}`,
  }, (err, response, body) => {
    console.log(' WHAT IS THE BODY?', body);
  });
});

module.exports = router;
