const fastify = require('fastify');
const port = 3100;
const app = fastify({
  logger: true
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

app.listen(port,()=>{
  console.log(`server listening on ${ port }`);
});

