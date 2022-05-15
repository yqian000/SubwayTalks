const router = require('express').Router();

let User = require('../models/User.model');

/*
    CREATE
    READ
    UPDATE
    DELETE
*/

/* Read all Users stored in the database */
router.route('/').get((req, res) => {
  // Find all users store in database
  User.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json('Error: ' + err));
});

/* Create a new User*/
router.route('/add_user').post((req, res) => {
  // Gather all User field info
  const username = req.body.username;
  const password = req.body.password;
  const votes = req.body.votes;

  // Create new User
  const newUser = new User({
    username,
    password,
    votes,
  });

  // Store new user to database
  newUser
    .save()
    .then(() => {
      res.json('User added!');
      console.log('User added!');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

/* Read User based on the username provided */
router.route('/findUser').get((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // find user by username and return user info
  User.find({ username, password })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json('Error: ' + err));
});

/* Read User based on the id provided */
router.route('/get/:id').get((req, res) => {
  // find user by id and return user info
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json('Error: ' + err));
});

/* Delete User based on the id provided */
router.route('/delete/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

/* Update User info based on the id provided */
router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.username = req.body.username;
      user.password = req.body.password;
      user.votes = req.body.votes;

      user
        .save()
        .then(() => res.json('User updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
