---
title: "How to build a twitter bot with Node.js and Heroku"
date: "2018-03-05"
tags: ["web development"]
coverImage: "/assets/profile_picture.jpg"
author:
  name: Dan McGrath
  picture: "/assets/profile_picture.jpg"
---

In this tutorial, we are going to create a twitter bot that tweets open Github issues with the tag 'help wanted'.

The source is available on my [Github](https://github.com/djm158/help-wanted-bot) and you can view the live bot [here](https://twitter.com/helpwantedbot).

### Getting Started

You're going to need the following:

- A [Twitter](https://twitter.com) account with a linked phone number
- Node.js installed locally
- A [Heroku](https://www.heroku.com/) account

### Dependencies

We're going to use [twit](https://github.com/ttezel/twit) and [octokit](https://github.com/octokit/rest.js) as clients to Twitter and Github's APIs, respectively. We're also going to use [dotenv](https://github.com/motdotla/dotenv) to load environment variables from a `.env` file.

To get started:

```sh
$ mkdir helper-bot
$ cd helper-bot
$ npm init
$ npm install --save twit @octokit/rest dotenv
$ touch .env .gitignore app.js
```

Your `package.json` should look something like this:

```json
{
  "name": "help-wanted-bot",
  "version": "1.0.0",
  "description": "twitter bot that tweets issues with tag 'help-wanted'",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
  "keywords": ["twitter", "github"],
  "author": "Dan McGrath",
  "license": "ISC",
  "dependencies": {
    "@octokit/rest": "^14.0.9",
    "dotenv": "^5.0.1",
    "twit": "^2.2.9"
  }
}
```

I added some keywords and a start script so you can run the app via `npm start`.

### Handling credentials

Once you've successfully created your twitter app, you should get to a screen with a bunch of api keys. We're going to keep them in the `.env` file, which we'll add to our `.gitignore` file so we don't accidentally commit it to source control.

Your `.env` file should look something like this:

```
CONSUMER_KEY=your_consumer_key
CONSUMER_SECRET=your_consumer_secret
ACCESS_TOKEN=your_access_token
ACCESS_TOKEN_SECRET=your_access_token_secret
```

and your `.gitignore` should look like:

```
node_modules
.env
```

### Scaffolding our app

Now we're going to dive into the js. First, we'll need to include the dependencies we'll be using to develop the app. At the top of your `app.js` file, add the following lines:

```js
const twit = require("twit");
const octokit = require("@octokit/rest")();
require("dotenv").config();
```

Now we'll be able to use `twit` and `octokit` to interact with Twitter and Github, respectively. We also loaded the api keys in our `.env` file into environment variables. We can interact with these via Node's [process.env](https://nodejs.org/docs/latest-v8.x/api/process.html#process_process_env) object.

For example, the `CONSUMER_KEY` variable in `.env` is available as `process.env.CONSUMER_KEY`. We will use this to provide `twit` our credentials.

Add the following lines to your `app.js`:

```js
const config = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
};

const Twitter = new twit(config);
```

We've created a `config` object with fields mapping to our credentials loaded in `process.env`. We provided this object to `twit`'s constructor, creating a new object `Twitter`. The `Twitter object will now be able to make authenticated requests to Twitter's API.

Let's test it out!

### Our bot's first tweet

Let's create a function that will post a tweet to our account (don't worry, we can easily delete this tweet later).

Add the following function to `app.js`:

```js
function postTweet(data) {
  Twitter.post(
    "statuses/update",
    {
      status: data,
    },
    function (err, data, response) {
      console.log(data);
    }
  );
}

postTweet();
```

The `postTweet` function calls `twit`'s `post` method to create a tweet with the status "Hello, world!". You'll notice that the last argument to the `post` function is an unnamed function. This is known as a `callback`. It is a function that will execute when `post` has finished. We simply log the data response to the console in our `callback`.

Let's try this out!

On the command line, run the following:

```sh
$ npm start
```

If we navigate to our bot's twitter page (mine is https://twitter.com/helpwantedbot) we'll see our bot's first tweet!

![](helloworldtweet.PNG)

Now we're talking. Next we'll get up and running with Github's API and start **saving the world** (the open source world, that is).

### Tweet some issues

Octokit makes it trivial to use [Github's search API](https://developer.github.com/v3/search/). Since this is going to be a pretty simple bot, we're just going to have it do a search for open issues with the tag "help wanted" every 10 minutes. Let's make a function to do a search.

Add the following code to `app.js`

```js
// declare this at the top of your app.js
const query = 'label:"help wanted"+state:open';

function getNewIssue() {
  octokit.search
    .issues({
      q: query,
      sort: "created",
    })
    .then((result) => {
      const item = result.data.items[0];
      console.log(item);
    });
}

// replace postTweet() with getNewIssue()
getNewIssue();
```

We're using [javascript promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) with octokit to hit Github's search API. Octokit's `search.issues` function takes an object with several option parameters ([see documentation](https://octokit.github.io/rest.js/)) but we're only using `q` and `sort`. `q` specifies the **query string** appended to the **REST** endpoint that octokit hits. In our case we're telling it we want labels "help wanted" and in the state "open". We sort by "created" so that the first result in our search is the newest.

In the `.then` statement, we use [arrow function syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) to return the result. `result` is a `json` response object with a field `data` that contains a list of issues in an array called `items`. We're simply grabbing the first item in the array and printing it out. Give it a try with `npm start`!

### Putting it all together

We're almost there! All we have to do is make our `postTweet` function accept some data from `getNewIssue` and we'll be tweeting away. Let's make it accept an argument `data` and call it from `getNewIssue`. While we're at it, we'll set our bot to tweet on a timed interval of ten minutes.

Modify your `app.js` to look like this:

```js
const twit = require("twit");
const octokit = require("@octokit/rest")();

require("dotenv").config();

const config = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
};

const Twitter = new twit(config);
const query = 'label:"help wanted"+state:open';
// 1000ms/1s * 60s/1 minute * 10 minutes
const repeatTime = 1000 * 60 * 10;

function getNewIssue() {
  octokit.search
    .issues({
      q: query,
      sort: "created",
    })
    .then((result) => {
      const item = result.data.items[0];
      postTweet(item.title + " " + item.html_url);
    });
}

function postTweet(data) {
  Twitter.post(
    "statuses/update",
    {
      status: data,
    },
    function (err, data, response) {
      console.log(data);
    }
  );
}

setInterval(getNewIssue, repeatTime);
```

Now we're passing the `title` and `html_url` of the Github issue to `postTweet` and then sitting it as our status! Try it with `npm start`. You'll have to wait ten minutes to see a tweet, so you can set the interval to be shorter and then stop the process by pressing `ctrl+c`.

### Deploy to Heroku

Heroku is the perfect host for our Node.js bot. Not only is it easy to configure, it's _free_. They have a great [getting started](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) tutorial to get you up and running.

The TL;DR of the tutorial is to create an account if you haven't and install the cli. You'll need to have [git installed] as well. Verify the installation with

```sh
$ git --version
```

While we have git ready, let's make our project a git repository that you can push to Github when we're done! Run the following in the top level directory of our project:

```sh
$ git config --global user.name <your name>
$ git config --global user.email <youremail@whatever.com>
$ git init
$ git add -A
$ git commit -m "initial commit"
```

Then run

```sh
$ heroku login
$ heroku create
```

Before we can get our bot running on heroku, we'll need to add our Twitter credentials to heroku. Navigate to your apps dashboard -> settings -> reveal config vars. Your keys should look something like

![heroku config vars](herokuconfigvars.PNG)

with the correct `VALUE` matching your `.env` file. Heroku will load these variables in the environment for us, therefore there is no need to load them via `dotenv`. We can add another config variable to heroku, called `NODE_ENV` that will tell our app whether it is in a testing/development/production environment. Add the following:

![node env](nodeEnv.PNG)

We will then wrap our `require('dotenv').config()` statement in an if statement to see if we are in production or not. This should look like:

```js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
```

Now we will be able to load our `.env` in local development, but Heroku will safely ignore it when `NODE_ENV` is set to `production`. Commit this change with

```sh
$ git add -A && git commit -m "add production environment check"
```

We're finally ready to launch or app. Run the following commands to push our app to Heroku:

```sh
$ git push heroku master
$ heroku ps:scale worker=1
```

This last line tells heroku what kind of app we are running. It should now tweet a new issue every 10 minutes! **Note:** this will fail if the top issue in the search hasn't changed over the last ten minutes, so in a later iteration we might want to check to see if we've already tweeted something (perhaps by storing our tweets in a database).

We can configure how are app runs more explicitly in a `Procfile`.

```sh
$ touch Procfile
```

Add the following to it:

```
worker: node app.js
```

Then:

```sh
$ git add Procfile && git commit -m "add Procfile"
$ git push heroku master
```

And we're all set! I hope you've found this tutorial useful. Be on the lookout for more tasty web dev tutorials soon.

Thanks!
