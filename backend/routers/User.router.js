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
    .then((user) => {
      res.json('User added!');
      console.log('User added!');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

/* Read User based on the username provided */
router.route('/findUser').post((req, res) => {
  const { username, password } = req.body;
  // Find this user name
  User.findOne({ username }, 'username password')
    .then((user) => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: 'Wrong Username or Password' });
      }
      // Check the password
      if (password === user.password) {
        res.json('User exist!');
        console.log('User exist!');
      } else {
        console.log('Invalid Login Credentials');
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
