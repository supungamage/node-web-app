const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} - ${req.url}`;

  fs.appendFile('server.log', log + '\n', (error) => {
    if(error) {
      console.log('Unable to log the record');
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screemIt', (txt) => {
  return txt.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send({
  //   name: 'Supun',
  //   subjects: [
  //     'maths',
  //     'IT'
  //   ]
  // });

  res.render('welcome.hbs', {
    pageDescription: 'Welcome to welcome',
    pageTitle: 'Welcome page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {pageTitle: 'About page'});
  //res.send('<h1>This is about</h1>');
});

app.get('/bad', (req, res) => {
  res.send({errorMessage: 'This is an bad request'});
});

app.get('/project', (req, res) => {
  res.render('project.hbs', {pageTitle: 'Project page'})
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
