var express = require('express');
// TODO visit docs for these places
var partials = require('express-partials'); // https://github.com/publicclass/express-partials
var bodyParser = require('body-parser');
var app = express();

//
// middleware
//

app.use(partials());
// load ejs engine TODO read docs to compare to erb
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
// allows us to use our "static" files
// also allows us to skip this directory path in our links
// dirname means "grab our current directoy, compared to this file i guess"
app.use(express.static(__dirname + '/static'));

var articles = [
    { title: 'Bernie! Bernie!', body: '#feelthebern' },
    { title: 'Trump for change!', body: 'Make America Great Again' },
    { title: 'Brian Hague founds the Daily Planet', body: 'Wow! Amazing! Such good news!' }
];

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/articles', function(req, res) {
    res.render('articles/index', { articles: articles });
});

app.get('/articles/:index/edit', function(req, res) {
  var index = parseInt(req.params.index);
  if (index < articles.length && index >= 0) {
    res.render('articles/edit', { article: articles[index],
      index: index});
  }
  else {
    res.send('invalid index for editing article', index);
  }
});

app.get('/articles/new', function(req, res) {
    res.render('articles/new');
});

app.get('/articles/:index', function(req, res) {
    var index = parseInt(req.params.index);
    if (index < articles.length && index >= 0) {
      // req.params.index is used as the value of index because its a string
      res.render('articles/show', { article: articles[req.params.index],
        index: req.params.index });
    } else {
        res.send('Error');
    }
});

app.post('/articles', function(req, res) {
    articles.push(req.body);
    res.redirect('/articles');
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.delete('/articles/:index', function(req, res) {
  // need ajax to send index as a params
  var index = parseInt(req.params.index);
  if (index < articles.length && index >= 0) {
    articles.splice(index, 1);
    res.send('article deleted at index ' + index);
  }
  else {
    res.send('index to delete article was not valid');
  }
});

app.put('/articles/:index', function(req, res) {
  var index = parseInt(req.params.index);
  console.log('edited article body is', req.body);
  if (index < articles.length && index >= 0) {
    articles[req.params.index] = req.body;
    // ajax call will redirect to proper page
    res.send('success');
  }
  else {
    res.send('error for index in edit article submission');
  }
});

app.listen(3000, function() {
    console.log("You're listening to the smooth sounds of port 3000 in the morning");
});
