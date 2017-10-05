# Project_3
How uTile should have been built from the beginning. P.s. fuck handlebars, React for the win!

# How to start
  * install linter, linter-eslint, linter-ui-default on atom or vb(hopefully they exist similarly in its ecosystem... ben ;) )     packages. Please do not work on any code until you have linting set up! If you are having issues getting this to work let someone know who already has linting up and running and we can get ya set up :)
# Install and Commands to run everything
  * Run `yarn install` from the root directory first
  * Then cd `client && yarn install`
  * Once all packages are installed we have a variety of commands to choose from.
  * We are using pm2 to run our server with babel-node as our interpreter so we get Es6 on our server side code as well. pm2 is also set up to run a watch on our server folder so we get auto reloads of the server for us :)
  * If you are starting up for the first time go ahead and run `yarn start`. This will kick off both the mongod process and server. If you see the log come up `child process failed to start` Then you may need to change the prestart script to say `mongod --fork --logpath /logs/mongodb.log --verbose`. Kill the server with `yarn pm2 delete all` then go ahead and run `yarn start`. If you still get a `child process failed` then well fuck.... ill need to sit with ya or zoom ya. But if you get `child process exited successfully` you should be able to run `yarn pm2 logs` and see server listening on 3000 and a connected to mongo log statement. If you made it this far go ahead and run `yarn start:react`. The dev server will auto open the browser to localhost:8080 for you with HMR for auto updating the client code and no full refresh needed Wooo!

    **Note** : Be sure to run `yarn pm2 logs` after the browser opens to watch your server logs just in case an error happens there you wont say 'What the hellll' ;)
  * If you have already started your server and mongod is running
  and you just need to start up the dev server run `yarn start:react`
  * If you need to kill the dev server just hit `ctrl-c` and if you need to kill the server you can run `yarn pm2 kill` or `yarn pm2 delete all ` **Note** the delete command is probably prefered as it will kill and delete an running instances all in one shot
