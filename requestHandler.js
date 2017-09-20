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
        res.redirect('/');
      } else {
        if (password === user.password) {
          util.createSession(req, res, user);
        } else {
          console.log('user or password wrong');
          res.redirect('/');
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
                }).then(function() {
                  util.createSession(req, res, user);
                  console.log('session created');
                });
              }
        } else {
          console.log('Account already exists');
          res.redirect('/');
        }
      });
  },
  // Retrieve existing events for particular user
  getEvents: function(req, res, next) {
    var username = req.body.username;

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
    var eventTitle = req.body.eventTitle;
 
    Event.findOne({eventTitle: eventTitle})
      .exec(function(err, event) {
        if (events) {
          res.status(200).send(event);
        } else {
          res.end('Event does not exist');
        }
      });
  },
  // Create event
  addEvent: function(req, res) {
    var eventTitle = req.body.title;
    // var eventLocation = req.body.location;
    var eventLocation = req.body.description;
    var eventTime = req.body.time;
    var eventUser = req.session.user.username;
    console.log(eventUser);
    console.log(req.body);

    Event.create({
            eventTitle: eventTitle,
            eventLocation: eventLocation,
            eventTime: eventTime,
            eventUsers: [eventUser]
          }).then(function() {
            console.log('event created');
            res.send('event created');
          });
  },
  // Add user to event
  updateEvent: function(req, res, next) {
    var eventTitle = req.body.eventTitle;
    var eventUser = req.body.user;

    Event.findOne({eventTitle: eventTitle})
      .exec(function(err, event) {
        if(!event) {
          // { "$push": { "eventUsers": eventUser } },
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
    var title = req.body.title.split(' ').join('+');;
    // var year = req.body.year;
    var event = req.body.event;

    Movie.findOne({title: title, event: event})
      .exec(function(err, movie) {
        if(movie) {
          console.log('Movie found in queue');
          res.status(200).send(movie);
        } else {
          var movieRequest = 'https://api.themoviedb.org/3/search/movie?api_key=&query=' + process.env.MOVIEDB_KEY + title;
          request(movieRequest, function(err, res, html) {
          if (err) {
            console.log(err);
          } else {
            var movieEntry = JSON.parse(html);
            if(movieEntry.title) {
              console.log('Movie found through API');
              var newMovie = new Movie({
                upvotes: 0,
                downvotes: 0,
                poster: movieEntry.poster_path, 
                overview: movieEntry.overview,
                releaseDate: movieEntry.release_date,
                title: movieEntry.title,
                popularity: movieEntry.popularity,
                voteCount: movieEntry.vote_count,
                voteAvg: movieEntry.vote_average,
                event: event
              });

              newMovie.save(function(err, entry) {
                if(err) {
                  res.send(500,err);
                }
                else {
                  console.log('Sending back to client', entry);
                  res.json(entry);
                } 
              });
            } else {
              console.log('Nothing found');
              res.send(200);              
            }
          }
        });
        }
      })
  },
  // upvote movie
  upvote: function(req, res) {
    var title = req.body.title;
    var event = req.body.event;

    Movie.findOne({title: title, event: event}).exec(function(err, movie) {
      if(movie) {
        movie.upvotes++;
        movie.save(function(err, entry) {
          if(err) {
            res.send(500, err);
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
    var event = req.body.event;
    Movie.findOne({title: title, event: event}).exec(function (err, movie) {
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
