const express = require('express');
let usersList = require('../../data/usersData');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Return list of all users
router.get('/', (req, res) => {
  res.send(usersList);
});

// Create new user
router.post('/', (req, res) => {
  const user = {
    id: uuidv4(),
    name: req.body.name
  }
  usersList = [ ...usersList, user ];
  res.status(201).send(user);
});

// Return single user
router.get('/:id', (req, res) => {
  const user = usersList.find(u => u.id === req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ errorMessage: 'User not available' });
  }
});

// update existing user
router.patch('/:id', (req, res) => {
  const user = usersList.find(u => u.id === req.params.id);
  if (user) {
    user.name = req.body.name;
    res.send(user);
  } else {
    res.status(404).send({ errorMessage: 'User not available' });
  }
});

// delete existing user
router.delete('/:id', (req, res) => {
  usersList = usersList.filter(u=>u.id !== req.params.id);
  res.sendStatus(204);
});


module.exports = router;