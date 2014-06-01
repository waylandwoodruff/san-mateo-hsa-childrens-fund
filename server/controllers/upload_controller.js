/*jslint node: true */
'use strict';

/*  This file contains the logic for handling requests submitted with the /donor
 *  path.  */
//    This file is required by (root folder)/server/routes/donor_routes.js

// NOTE: Sequelize has a strange promise implementation, can possibly refactor to bluebird, but
// for now it'll look a bit messy because every error has to be handled (no way to propagate
// promise chain using return new Promise)

// var Child = require('../config/mysql_config.js').Child;
// var Donor = require('../config/mysql_config.js').Donor;
// var Staff = require('../config/mysql_config.js').Staff;
// var Admin = require('../config/mysql_config.js').Admin;
// var HelpDesk = require('../config/mysql_config.js').HelpDesk;
var url = require('url');
var path = require('path');
var fs = require('fs');

module.exports.saveImage = function (req, res) {
  console.log('HERE!!!: ', req.method);
  var partial = '';
  req.on('data', function (chunk) {
    partial += chunk;
  });
  req.on('end', function () {
    
  })
};

module.exports.serveImage = function (req, res) {

};


module.exports.fetchUsers = function(req, res){
  var urlArray = parseUrl(req);
  var User = setUserType(urlArray[1]);
  User.findAll().success(function(users){
    res.send(users);
  });
};

module.exports.fetchUser = function(req, res){
  var urlArray = parseUrl(req);
  var User = setUserType(urlArray[1]);
  var userId = urlArray[2];
  User.find({where: {id: userId}}).success(function(user){
    if(!user) {
      res.send(404);
    } else {
      res.send(user);
    }
  }).error(function(err){
    res.send(500);
  })
}

module.exports.editUser = function(req, res){
  var urlArray = parseUrl(req);
  var User = setUserType(urlArray[1]);
  var userId = urlArray[2];
  User.find({where: {id: userId}}).success(function(user){
    if(!user){
      res.send(404);
    } else {
      user.updateAttributes(req.body).success(function(user){
        res.send(user);
      }).error(function(err){
        res.send(500);
      });
    }
  }).error(function(err){
    res.send(500);
  });
}
