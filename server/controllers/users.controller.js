const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors')

process.env.SECRET_KEY = "secret";


exports.user_create = function (req, res) {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.send('connard')
      }

      else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          }
          else {
            let user = new User({
              username: req.body.username,
              email: req.body.email,
              password: hash,
            });

            user.save(function (err) {
              if (err) {
                res.status(400);
                res.send(err);
                return;
              }
              res.send({ message: "Registration successfull, User created!", user });
            })
          }
        });
      }
    })
};



exports.users_list = function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send(users);
  });
};

exports.user_details = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send(user);
  });
};

exports.user_update = function (req, res) {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, function (
    err,
    user
  ) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send({ message: "User Udpated successfully!", user });
  });
};

exports.user_delete = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, result) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send({ message: "User Deleted successfully!", result });
  });
};




exports.log_in = function (req, res) {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Password match
          const payload = {
            _id: user._id,
            username: user.username,
            email: user.email
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '24h'
          })
          res.send(token)
          console.log('tout bon')
        } else {
          // Password doesn't match
          res.json({ error: 'User does not exist' })
        }
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

exports.log_in = function (req, res) {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'auth failed'
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'auth failed'
          });
        }

        if (result) {
          const payload = {
            userId: user._id,
            username: user.username,
            email: user.email
          }

          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '24h'
          })
          res.send(token)
          console.log('Log in confirmed, token sent');
        }
      })
    })
}


