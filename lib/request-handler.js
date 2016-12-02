var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {

  Link.find({}, function(err, links) {
    if (err) {
      throw err;
    }
    res.status(200).send(links);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.sendStatus(404);
  }

  util.getUrlTitle(uri, function(err, title) {
    if (err) {
      console.log('Error reading URL heading: ', err);
      return res.sendStatus(404);
    }
    var newLink = Link({
      url: uri,
      baseUrl: '192.241.208.192',
      title: title,
    });
    newLink.save(function(err) {
      if (err) {
        throw err;
      }
      console.log('Link added!');
    });
  });

};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.find({name: username}, function(err, user) {
    if (err) {
      throw err;
    }
    // console.log(user, 'user inside login');
    if (user.length === 0) {
      console.log('user not in db');
      res.redirect('/login');
    } else {
      User.comparePassword(password, user.password, function(match) {
        if (match) {
          util.createSession(req, res, user);
        } else {
          res.redirect('/login');
        }
      });
    }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.find({name: username}, function(err, user) {
    if (err) {
      throw err;
    }
    if (user.length === 0) {
      var newUser = User({
        name: username,
        password: password
      });
      newUser.save(function(err) {
        if (err) {
          throw err;
        }
        console.log('User added!');
        res.redirect('/');
      });
    } else {
      console.log('Account already exists');
      res.redirect('/signup');
    }
  });
};

exports.navToLink = function(req, res) {
 
};