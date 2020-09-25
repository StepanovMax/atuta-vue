'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import model from '../models';
var model = require('../models');

var User = model.User;

// console.log('>> userSignUp');

var Users = function () {
  function Users() {
    _classCallCheck(this, Users);
  }

  _createClass(Users, null, [{
    key: 'signUp',
    value: function signUp(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          username = _req$body.username,
          email = _req$body.email,
          password = _req$body.password;

      return User.create({
        name: name,
        username: username,
        email: email,
        password: password
      }).then(function (userData) {
        return res.status(201).send({
          success: true,
          message: 'User successfully created',
          userData: userData
        });
      });
    }
  }, {
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      return User.findAll({
        raw: true
      }).then(function (userData) {
        return res.status(201).send({
          success: true,
          message: 'Users successfully showed',
          userData: userData
        });
      });
    }
  }]);

  return Users;
}();

module.exports = Users;