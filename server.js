const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const partial = require('express-partial');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const bodyParser = require('body-parser') ;

const webpackConfig = require('./webpack.config.js');
const requestHandler = require('./requestHandler.js');
const util = require('./lib/utility');

const app = express();
const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/www'));
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
app.use(partial());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/src'));

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.post('/signup', requestHandler.addUser);

// app.get('/signup', function(req, res) {
//   res.render('/');
// })

app.post('/signin', requestHandler.getUser);
app.get('/signin', function(req, res) {
  res.render('/');
});

app.get('/create', function(req, res) {
  res.redirect('/');
});
app.post('/create', util.checkUser, requestHandler.addEvent);

app.post('upvote', );
app.post('downvote',);

// app.get('/logout', function(req, res) {
//   req.session.destroy(funciton() {
//     res.redirect('/');
//   });
// });




