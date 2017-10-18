import express from 'express';
import request from 'request';

const githubRouter = express.Router();

// Get repos for a user
githubRouter.post('/getRepos', (req, res) => {
  //  console.log(req.body);
  // console.log(' SUCCESS POST TO GET REPOS GIT ROUTER', req.body);
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'GET',
    json: true,
    url: `https://api.github.com/users/${req.body.id}/repos?sort=pushed&type=all`,
  }, (err, response, body) => {
    // console.log(' WHAT IS THE BODY?', body);
    if (!err) {
      return res.status(200).json({ repos: body, err: null });
    }
    res.status(500).json({ err, repos: null });
  });
});

// Get comments from a specific issue
githubRouter.post('/getIssueComments', (req, res) => {
  //  console.log("We are getting successful hit on gitrouter", req.body);
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'GET',
    json: true,
    url: `https://api.github.com/repos/${req.body.id}/${req.body.repoName}/issues/${req.body.num}/comments`,
  }, (err, response, body) => {
    // console.log(' WHAT IS THE BODY?', body);
    if (!err) {
      return res.status(200).json({ comments: body, err: null });
    }
    res.status(500).json({ err, repos: null });
  });
});

// Get Collaborators
githubRouter.post('/getCollaborators', (req, res) => {
  //  console.log(req.body, 'hitting Collab GitRouter');
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'GET',
    json: true,
    url: `https://api.github.com/repos/${req.body.id}/${req.body.repoName}/collaborators?access_token=${req.body.token}`,
  }, (err, response, body) => {
    // console.log(' WHAT IS THE BODY?', body);
    if (!err) {
      return res.status(200).json({ collabs: body, err: null });
    }
    res.status(500).json({ err, collabs: null });
  });
});

// Get all pull requests
githubRouter.post('/api/github/getPulls', (req, res) => {
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
githubRouter.post('/api/github/createIssue', (req, res) => {
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
// githubRouter.post('/api/github/createPullRequest', (req, res) => {
//   request({
//     headers: {
//       Accept: 'application/vnd.github.v3.full+json',
//       'User-Agent': 'request',
//     },
//     method: 'POST',
//     json: true,
//     url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/pulls?access_token=${req.user.github.token}`,
//     body: { title: req.body.title,
//       head: req.body.head,
//       base: req.body.base,
//       body: req.body.body },
//   }, (err, response, body) => {
//     console.log(' WHAT IS THE BODY?', body);
//   });
// });

// Create pull request comment
// githubRouter.post('/api/github/createPullRequestComment', (req, res) => {
//   request({
//     headers: {
//       Accept: 'application/vnd.github.v3.full+json',
//       'User-Agent': 'request',
//     },
//     method: 'POST',
//     json: true,
//     url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/pulls/${req.body.number}/comments?access_token=${req.user.github.token}`,
//     body: { body: req.body.body,
//       commit_id: req.body.commit_id,
//       path: req.body.path,
//       position: req.body.position }, // position must be passed as an integer
//   }, (err, response, body) => {
//     console.log(' WHAT IS THE BODY?', body);
//   });
// });

// Add assignees to issues
githubRouter.post('/api/github/addAssignees', (req, res) => {
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
// githubRouter.post('/api/github/addCollaborator', (req, res) => {
//   request({
//     headers: {
//       Accept: 'application/vnd.github.v3.full+json',
//       'User-Agent': 'request',
//     },
//     method: 'PUT',
//     json: true,
//     url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/collaborators/${req.body.username}?access_token=${req.user.github.token}`,
//   }, (err, response, body) => {
//     console.log(' WHAT IS THE BODY?', body);
//   });
// });

// Create comment on issue
// githubRouter.post('/api/github/createIssueComment', (req, res) => {
//   request({
//     headers: {
//       Accept: 'application/vnd.github.v3.full+json',
//       'User-Agent': 'request',
//     },
//     method: 'POST',
//     json: true,
//     url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/issues/${req.body.number}/comments?access_token=${req.user.github.token}`,
//     body: { body: req.body.body },
//   }, (err, response, body) => {
//     console.log(' WHAT IS THE BODY?', body);
//   });
// });

// Edit an issue
// githubRouter.post('/api/github/editIssue', (req, res) => {
//   request({
//     headers: {
//       Accept: 'application/vnd.github.v3.full+json',
//       'User-Agent': 'request',
//     },
//     method: 'PATCH',
//     json: true,
//     url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/issues/${req.body.number}?access_token=${req.user.github.token}`,
//     body: { title: req.body.title,
//       body: req.body.body,
//       assignees: req.body.assignees },
//   }, (err, response, body) => {
//     console.log(' WHAT IS THE BODY?', body);
//   });
// });

// Get issues
githubRouter.post('/getIssues', (req, res) => {
  // console.log(' SUCCESS POST TO GET Issues GIT ROUTER', req.body);
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'GET',
    json: true,
    url: `https://api.github.com/repos/${req.body.id}/${req.body.repoName}/issues?filter=all&sort=updated`,
  }, (err, response, body) => {
  // console.log(' WHAT IS THE BODY?', body);
    if (!err) {
      return res.status(200).json({ issues: body, err: null });
    }
    res.status(500).json({ err, issues: null });
  });
});

// Get events feed
githubRouter.post('/api/github/getEvents', (req, res) => {
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'GET',
    json: true,
    url: `https://api.github.com/users/${req.body.username}/events`,
  }, (err, response, body) => {
    // console.log(' WHAT IS THE BODY?', body);
  });
});


// // Remove a Collaborator
// githubRouter.post('/api/github/removeCollaborator', (req, res) => {
//   request({
//     headers: {
//       Accept: 'application/vnd.github.v3.full+json',
//       'User-Agent': 'request',
//     },
//     method: 'DELETE',
//     json: true,
//     url: `https://api.github.com/repos/${req.body.owner}/${req.body.repo}/collaborators/${req.body.username}?access_token=${req.user.github.token}`,
//   }, (err, response, body) => {
//     console.log(' WHAT IS THE BODY?', body);
//   });
// });


// Authorize a user on github
// TODO MOVE THIS TO GITHUB AUTH ROUTER
githubRouter.post('/api/github/authorize', (req, res) => {
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'GET',
    json: true,
    url: `http://github.com/login/oauth/authorize`,
  }, (err, response, body) => {
    // console.log(' WHAT IS THE BODY?', body);
    // // Tested in node
    // const b64string = body.content;
    // const buf = Buffer.from(b64string, 'base64');
    // // We will need to send to the component
    // res.send(buf.toString());
  });
});

// Get Readme
githubRouter.post('/readme', (req, res) => {
  // console.log("Hitting github router for readme!!", req.body);
  request({
    headers: {
      Accept: 'application/vnd.github.v3.full+json',
      'User-Agent': 'request',
    },
    method: 'GET',
    json: true,
    url: `https://api.github.com/repos/${req.body.id}/${req.body.repoName}/readme`,
  }, (err, response, body) => {
    console.log('WTF IS MY README BODY', body);
    if (!err) {
      const b64string = body.content;
      const buf = Buffer.from(b64string, 'base64');
      const readme = buf.toString();
      return res.status(200).json({ readme: readme, err: null });
    }
    res.status(500).json({ err, issues: null });
  });
  // // We will need to send to the component
  // res.send(buf.toString());
});

export default githubRouter;
