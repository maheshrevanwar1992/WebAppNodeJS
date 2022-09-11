let usersList = require('../../data/usersData');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const handleFetchAllUsers = (req, res) => {
  res.send(usersList);
};
const handleCreateNewUser = (req, res) => {
  const user = {
    id: uuidv4(),
    name: req.body.name
  }
  usersList = [ ...usersList, user ];
  res.status(201).send(user);
};
const handleFetchSingleUser = (req, res) => {
  const user = usersList.find(u => u.id === req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ errorMessage: 'User not available' });
  }
};
const handleUpdateUser = (req, res) => {
  const user = usersList.find(u => u.id === req.params.id);
  if (user) {
    user.name = req.body.name;
    res.send(user);
  } else {
    res.status(404).send({ errorMessage: 'User not available' });
  }
};
const handleDeleteUser = (req, res) => {
  usersList = usersList.filter(u=>u.id !== req.params.id);
  res.sendStatus(204);
};

// Return list of all users
router.get('/', handleFetchAllUsers);

// Create new user
router.post('/', handleCreateNewUser);
// Return single user
router.get('/:id', handleFetchSingleUser);
// update existing user
router.patch('/:id', handleUpdateUser);
// delete existing user
router.delete('/:id', handleDeleteUser);


/*router.route('/:id')
  .get(handleFetchSingleUser)
  .post(handleCreateNewUser)
  .delete(handleDeleteUser)
  .patch(handleUpdateUser);*/

module.exports = router;