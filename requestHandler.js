var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var key = require('dotenv').config();

var db = require('./db.js');
var Event = require('./model/event.js');
var Movie = require('./model/moviequeue.js');
var User = require('./model/user.js');
var util = require('./lib/utility');

module.exports = {
  // User log in
  getUser: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: username })
    .exec(function(err, user) {
      if (!user) {
        console.log('User doesn\'t exisit');
        res.send('error');
      } else {
        if (password === user.password) {
          util.createSession(req, res, user);
          console.log('session created', user);
        } else {
          console.log('user or password wrong');
          res.send('error');
        }
      }
    });
  },
  // User sign up
  addUser: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username})
      .exec(function(err, user) {
        if(!user) {
          if (err) {
            throw err;
          } else {
            User.create({
              username: username,
              password: password
            }, function(err, user) {
                util.createSession(req, res, user);
            });
          }
        } else {
          console.log('Account already exists');
          res.send('error');
        }
      });
  },
  // Retrieve existing events for particular user
  getEvents: function(req, res, next) {
    var username = req.session.user.username;

    User.findOne({ username: username })
    .exec(function(err, user) {
      if (!user) {
        res.send('User not found');
      } else {
        res.status(200).send(user.events);
      }
    });
  },

  // Retrieve event details
  getEventDetail: function(req, res, next) {
    var eventTitle = req.body.event;
    Event.findOne({eventTitle: eventTitle})
      .exec(function(err, event) {
        if (event) {
          console.log('got the event', event);
          res.status(200).send(event);
        } else {
          res.end('Event does not exist');
        }
      });
  },
  // Create event
  addEvent: function(req, res) {
    var eventTitle = req.body.title;
    var eventLocation = req.body.location;
    var eventDate = req.body.date;
    var eventDesc = req.body.description;
    var eventUser = req.session.user.username;

    Event.create({
            eventTitle: eventTitle,
            eventLocation: eventLocation,
            eventTime: eventDate,
            eventDesc: eventDesc,
            eventUsers: [eventUser]
          }, function(err, event) {
            console.log(event);
          });

    User.findOne({username: eventUser})
      .exec(function(err, user) {
        if(user) {
          user.events.push(eventTitle);
          user.save();
        } else {
          console.log('user does not exisit');
        }
      });
  },
  // Add user to event
  updateEvent: function(req, res, next) {
    var eventTitle = req.body.eventTitle;
    var eventUser = req.body.user;

    Event.findOne({eventTitle: eventTitle})
      .exec(function(err, event) {
        if(event) {
          event.eventUsers.push(eventUser);
          event.save();
        } else {
          console.log('Event does not exisit');
        }
      });
  },
  // Retrieve existing movie queue
  getMovie: function(req, res) {
    Movie.find().exec(function(err, movies) {
      if (movies) {
        res.status(200).send(movies);
      } else {
        res.end('Movie queue does not exist');
      }
    });
  },
  // Create new movie queue
  addMovie: function(req, res) {
    console.log(req.body);
    var title = req.body.currentMovie.title;
    var event = req.body.event;

    Movie.findOne({title: title, event: event})
      .exec(function(err, movie) {
        if(movie) {
          console.log('Movie already in queue');
          res.status(200).send(movie);
        } else {
          console.log('Movie not in queue yet');
          var movieId = req.body.currentMovie.id;
          var moviePoster = req.body.currentMovie.poster;
          var movieOverview = req.body.currentMovie.overview;
          var movieVotes = req.body.currentMovie.votes;

          Movie.create({
                  title: title,
                  id: movieId,
                  poster: moviePoster,
                  overview: movieOverview,
                  votes: movieVotes,
                  upvotes: 0,
                  downvotes: 0,
                  event: [event]
                }, function(err, movie) {
                  console.log('Movie added to queue');
                  res.send(movie);
                });
          }
        });
  },
  // upvote movie
  upvote: function(req, res) {
    var title = req.body.title;
    // var event = req.body.event;
    Movie.findOne({title: title}).exec(function(err, movie) {
      if(movie) {
        console.log('upvote movie found');
        movie.upvotes++;
        movie.save(function(err, entry) {
          if(err) {
            console.log(movie);
            console.log(err);
            res.send(500, err);
          } else {
            console.log('update successful');
            res.send(201, movie.upvotes);
          }
        })
      } else{
        console.log('Movie not found, please vote for other movie');
      }
    });
  },
  // downvote movie
  downvote: function (req, res) {
    var title = req.body.title;
    // var event = req.body.event;
    Movie.findOne({title: title}).exec(function (err, movie) {
      if(movie) {
        movie.downvotes++;
        movie.save(function(err, entry) {
          if(err) {
            res.send(500, err);
          }
        })
      } else{
        console.log('Movie not found, please vote for other movie');
      }
    });
  }


};
