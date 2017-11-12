# uTile Developer's Application
This web application is designed to help bootcampers and developers alike.  The general idea behind this application is to create a simple task management application that allows users to interact with all GitHub repositories they have access to and manage tasks and issues in a more concise way to increase productivity.  There are a couple bugs in the current version that are being worked out and should be deployed as soon as possible. This application originally started as a bootcamp final project, but now has progressed to an open source project. We woudl love other contributors to help us get the functionality to where we want it, and create a web application that could become the swiss army knife of task management and collaboration.  If you wish to get involved please contact me on github @901david.  

## Current functionality

* Event feed coming in from GitHub:  This allows users to view all their current events that they have been doing on GitHub.  
* Repository Drawer: This a drawer feature that shows current repos.  It is listed by your most recently updated or used repos, and currently will only display a set amount, not ALL repositories.  
* Once a repo is selected we get current issues:  This shows all open issues on teh repository, who created it, who they are assigned to, and all the current comments. In the current functionality you are also able to comment on an issue and close an issue from our application.
* Collaborators:  Once in a specific project you are able to view the collaborators on that project.
* Matrix:  This is our design of a task manager (local).  It uses the Eisenhower model. This model allows users to designate tasks into critical and non-critical categories, as well as urgent vs. non-urgent within those categories. We think this is a fantastic model to break tasks down into subsets that allow the most important things to be accomplished in the most efficient manner.
* Code Editor:  Currently we are using a react version of the Monaco Code Editor. It is powered by VSCode and is a very nice in-app IDE to be able to write code ont he fly and eventually share with teammates.

## Current bugs

While all the above functionality was working at one time, unfortunately we hit a few roadbloacks when deploying. We are currently working on getting the application into a working state as we previously had it. This is priority number one, and once we have the application working as already designed we plan on integrating the features one at a time that we thought of and know we can implement but just were unable to accomplish due to time.

## Current Technology

This project has a very wide range of technology in it and I won't hit it all but give a very high level overview.  We built the site on React & Redux.  We are using server-side rendering with hot reloading on both the dev server and the backend server as well. This is EXTREMELY convenient when devving as any changes that occur auto reloads both the server and the dev server. We used a variety of other technologies such as React Toolbox & React Collapsible. For our layout we used a combination of CSS Grid, flex and bootstrap.

## The Future of uTile developers

We truly think this is a project worth pursuing. Once the current bugs have been sorted out, I will be making a very solid list of issues that need to start being tackled. Our hopes would be to eventually add the following into the project:

* Converting GitHub issues into Matrix issues.
* Slack integration
* Local Chat integration
* Team Integration locally: This would mean that you can communicate with other people you have authorized locally through our application as part of your team.
* Change the code editor to a live coding environment. This would mean that you could actually invite a team mate into the code editor and potentially even add in video and actually write code together in real time.  This is the type of collaboration we want this application to promote.
* Incorporate bitbucket to be used in our site as well.
* Get the matrix fully functional.


# How to start to get started contributing
  * Clone Development and make a new branch.
  * install linter, linter-eslint, linter-ui-default on atom or vb(hopefully they exist similarly in its ecosystem... ben ;) )     packages. Please do not work on any code until you have linting set up! If you are having issues getting this to work let someone know who already has linting up and running and we can get ya set up :)
# Install and Commands to run everything
  * Run `yarn install` from the root directory first
  * Then cd `client && yarn install`
  * Once all packages are installed we have a variety of commands to choose from.
  * We are using pm2 to run our server with babel-node as our interpreter so we get Es6 on our server side code as well. pm2 is also set up to run a watch on our server folder so we get auto reloads of the server for us :)
  * If you are starting up for the first time go ahead and run `yarn start`. This will kick off both the mongod process and server. If you see the log come up `child process failed to start` Then you may need to change the prestart script to say `mongod --fork --logpath /logs/mongodb.log --verbose`. Kill the server with `yarn pm2 delete all` then go ahead and run `yarn start`. If you still get a `child process failed` then well fuck.... ill need to sit with ya or zoom ya. But if you get `child process exited successfully` you should be able to run `yarn pm2 logs` and see server listening on 3000 and a connected to mongo log statement. If you made it this far go ahead and run `yarn start:react`. The dev server will auto open the browser to localhost:8080 for you with HMR for auto updating the client code and no full refresh needed Wooo!
  * Once you have completed your changes submit a PR.

    **Note** : Be sure to run `yarn pm2 logs` after the browser opens to watch your server logs just in case an error happens there you wont say 'What the hellll' ;)
  * If you have already started your server and mongod is running
  and you just need to start up the dev server run `yarn start:react`
  * If you need to kill the dev server just hit `ctrl-c` and if you need to kill the server you can run `yarn pm2 kill` or `yarn pm2 delete all ` **Note** the delete command is probably prefered as it will kill and delete an running instances all in one shot
