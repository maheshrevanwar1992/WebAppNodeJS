let usersList = require('../../data/usersData');
const { v4: uuidv4 } = require('uuid');

const userSchema = {
  type: 'object',
  required: [ 'name' ],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    education: {
      type: 'string'
      // default: null
    }
  }
};

/*
 schema
 1. Type conversation -> id can be converted into integer
 2. if you remove one prop from above properties' obj, it will not be added to response
 3. you can default value for any property
* */


const listApiResponseSchema = {
  response: {
    200: {
      type: 'array',
      items: userSchema
    }
  }
};

const singleEntityResponseSchema = {
  response: {
    200: userSchema
  }
};

const route = (fastify, opts, done) => {
  // Return list of all users
  fastify.get('/', { schema: listApiResponseSchema }, (req, res) => {
    res.send(usersList);
  });

  // Create new user
  fastify.post('/',
    {
      schema: { body: userSchema }
    },
    (req, res) => {
      const user = {
        id: uuidv4(),
        name: req.body.name
      }
      usersList = [ ...usersList, user ];
      res.status(201).send(user);
    }
  );

  //  Return single user
  fastify.get('/:id', {
    schema: singleEntityResponseSchema,
    handler: (req, res) => {
      const user = usersList.find(u => u.id === req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ errorMessage: 'User not available' });
      }
    }
  });

  // update existing user

  const updateRequestOptions = {
    schema: {
      body: {
        ...userSchema,
        not: { required: [ 'id' ] }
      }
    },
    handler: (req, res) => {
      const user = usersList.find(u => u.id === req.params.id);
      if (user) {
        user.name = req.body.name;
        res.send(user);
      } else {
        res.status(404).send({ errorMessage: 'User not available' });
      }
    }
  };
  fastify.patch('/:id', updateRequestOptions);

  // delete existing user
  fastify.delete('/:id', (req, res) => {
    usersList = usersList.filter(u => u.id !== req.params.id);
    res.status(204).send();
  });

  done();
}


module.exports = route;