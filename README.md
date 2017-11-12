# PartyStarty

PartyStarty is an event organize application.  The current release is focusing on movie night event.  The user will be able to
- create event
- search movie
- share event with friends, and friends can vote on the existing movies or add new movies

## Table of Contents

1. [Team](#team)
1. [Getting Started](#getting-started)
1. [Usage](#usage)
1. [Built With](#built-with)
1. [License](#license)

## Team

PartyStarty is being developed by four full-stack engineers.

* **Bryan Wang** - [bryangxyz](https://github.com/bryangxyz)
* **David Zou** - [Davidzsy20](https://github.com/Davidzsy20)
* **Paul Jaffre** - [jaffrepaul](https://github.com/jaffrepaul)
* **Simon Zheng** - [skzheng](https://github.com/skzheng)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites & Installing

1. Fork the repo and clone it to your development environment of choice.

2. To install apple(Me) dependencies, run the following command from the cloned repo's directory:

```npm install```

### Configuration

You will need several API Keys to run your own build of PartyStarty. We use the NPM package [dotenv](https://github.com/motdotla/dotenv) for our local environment variables. You should make a .env file, placed in your clone's root directory, that looks like this:

```
MOVIEDB_KEY=(The Movie Database API Key) // Available from [The Movie Database](https://developers.themoviedb.org/3/getting-started)
```

## Usage

![Splash](https://github.com/bryangxyz/PartyStarty/blob/dev/www/createevent.png)
![Splash](https://github.com/bryangxyz/PartyStarty/blob/dev/www/moviesearch.png)

### Login

PartyStarty needs to track your profile in order to learn about you, so start by signing up then logging in.

Contact us if you have any questions!

## Built With

* [React](https://facebook.github.io/react/) - Facebook's powerful JavaScript framework
* [Node.js](https://nodejs.org) - JavaScript runtime
* [Express](https://expressjs.com/)- Fantastic Node.js web server framework
* [mongoose](https://github.com/Automattic/mongoose) - a MongoDB object modeling tool
* [mongodb](https://www.mongodb.com/) - document-oriented database
* [React bootstrap](https://github.com/react-bootstrap/react-bootstrap) - front-end framework rebuilt for React
* [Webpack](https://webpack.github.io/) - Module bundler

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
