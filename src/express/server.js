const express = require('express');
const port = 3100;
const app = express();
const { dateTimeLogger, urlLogger } = require('../middleware');


// 1. Basic route handling
app.get('/', (req, res) => {
  console.log('reached');
  res.send('First page');
});

// 2. Basic route handling and body/query/path param handling
app.use(express.json())    // <==== parse request body as JSON, is example of middleware
app.post('/paramExample/:pathParam', (req, res) => {
  res.send({
    pathParamValue: req.params.pathParam,
    queryParamValue: req.query.queryParam,
    bodyParam: req.body
  });
});


// 3. Advance Routing - grouping of routes
const users = require('./routes/users');
app.use('/users', users);


/* 4. Advance routing - using routers route method - add single route for all methods
const routeUsers = require('./routes/routeUsers');
app.use('/users', routeUsers);*/


// 5. Top to bottom approach
app.get('/test/:id', (req, res) => {
  res.send(`test ${req.params.id} api`);
});

app.get('/test/static', (req, res) => {
  res.send('static API path');
});


//// ----> (keep in mind top-down approach)

// 6. middleware at app level
//app.use(urlLogger);

// 7. middleware at route level
// app.use('/users', dateTimeLogger, users);

// 8. multiple middleware
// app.use('/users', urlLogger, dateTimeLogger, users);

// 9. middleware at single route level
app.get('/with-middleware', (req, res) => {
  res.send(`test middleware at single route level`);
});


// 10. render static html
app.set('view engine', 'ejs');
app.get('/html', (req, res) => {
  res.render('sample');
  // 10.1 passing data from JS to HTML
  //res.render('sample', { name: "some person name" });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${ port }`)
});