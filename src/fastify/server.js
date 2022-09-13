const fastify = require('fastify');
const port = 3100;
const app = fastify({
  logger: true
});


/*
  1. if we do pass any auth then error will be bad authorization header
  2. if user and password is wrong then below error message will be returned
  3. authenticate: true is required -> it will add WWW-Authenticate header
      using that browser can detect user and pass is required
 */
/* uncomment this code to use basic authentication
function validate (username, password, req, reply, done) {
  if (username === 'admin' && password === 'Nutanix.123') {
    done();
  } else {
    done(new Error('username or password is incorrect'));
  }
}

app.register(require('@fastify/basic-auth'), { validate, authenticate: true })
  .after(() => {
    app.addHook('onRequest', app.basicAuth)
  });

*/

// this adds swagger support
app.register(require('@fastify/swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'user-api' }
  }
});

// 1. no change - just res is called reply in fastify world, but it will not make any diff due to function arguments
app.get('/',(req, res)=>{
  res.send('fastify initial page');
});

// 2. Same as express - but we dont need middleware to parse a response in fastify
app.post('/paramExample/:pathParam', (req, res) => {
  res.send({
    pathParamValue: req.params.pathParam,
    queryParamValue: req.query.queryParam,
    bodyParam: req.body
  });
});

// 3. Advance Routing - grouping of routes
const users = require('./routes/users');
// app.use('/users', users); express way
app.register(users, { prefix: '/users' });


// 4. Hooks
app.addHook('onRequest',(req, res, done)=>{
  console.log(`request received: ${JSON.stringify(req.body)}`);
  done();
});

app.addHook('preValidation',(req, res, done)=>{
  console.log(`request received: ${JSON.stringify(req.body)}`);
  done();
})

app.listen({ port }, function(err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
  console.log(`server listening on ${ port } ${ address }`);
});

