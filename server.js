const config = require('./config.json');
const express = require('express');
const {MongoClient} = require('mongodb');
const app = express();
console.log(config.port);

app.use(express.static(__dirname + '/public'));

var url = "";

var partOne = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <style>
     body 	{ padding-top:50px; }
    </style>`;
var partTwo = `   </head>
<body class="container">
 <header>
   <nav class="navbar navbar-default">
     <div class="container-fluid">
       <div class="navbar-header">
         <a class="navbar-brand" href="/">g33k.me</a>
       </div>
       <ul class="nav navbar-nav">
         <li><a href="/">Home</a></li>
         <li><a href="/posts">Posts</a></li>
         <li><a href="/blurbs">Blurbs</a></li>
         <li><a href="/about">About</a></li>
         <li><a href="/friends">Friends</a></li>
       </ul>
     </div>
   </nav>
 </header>
 <main>`;
 var partThree = `
 </main>
 <footer>
   <p class="text-center text-muted">&copy; Copyright 2020 g33k.me</p>
 </footer>
</body>
</html>`;


MongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
})
app.get('/', (req, res) => {
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
    }, (err, db) => {
    if (err) throw err;
    var dbo = db.db("blogdb");
    dbo.collection("posts").find({}).sort({date: -1}).toArray(function(err, result) {
      let data = [];
      if (err) throw err;
      result.forEach(element => {
        if(element.type == "post"){
          data.push({title:element.title, content:element.content.substring(0, 200)+"...", type:element.type, path:element.path});          
        }else{
          data.push({title:element.title, content:element.content, type:element.type, path:element.path});
        }
      });
      res.send(partOne+`
    <title>Home</title>
`+partTwo+data.map(product =>`
      <a href="/${product.type}/${product.path}/">${product.title}</a><br>
      <p>${product.content}</p>`).join('')+partThree)
      db.close();
    });
  });
});

app.get('/posts', (req, res) => {
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
    }, (err, db) => {
    if (err) throw err;
    var dbo = db.db("blogdb");
    dbo.collection("posts").find({type: "post"}).sort({date: -1}).toArray(function(err, result) {
      let data = [];
      if (err) throw err;
      result.forEach(element => {
        if(element.type == "post"){
          data.push({title:element.title, content:element.content.substring(0, 200)+"...", type:element.type, path:element.path});          
        }
      });
      res.send(partOne+`
    <title>Posts</title>
`+partTwo+data.map(product =>`
      <a href="/${product.type}/${product.path}/">${product.title}</a><br>
      <p>${product.content}</p>`).join('')+partThree)
      db.close();
    });
  });
});

app.get('/blurbs/:pageNum', (req, res) => {
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
    }, (err, db) => {
    if (err) throw err;
    var dbo = db.db("blogdb");
    if(req.params.pageNum == "0") var pageSkip = 0;
    else if(req.params.pageNum == "1") var pageSkip = Number(req.params.pageNum)-1;
    else var pageSkip = Number(req.params.pageNum)*10-10;
    var yesNext;
    var yesPrev;
    dbo.collection("posts").find({}).sort({date: -1}).limit(11).skip(pageSkip).toArray(function(err, result) {
      if (err) throw err;
      if(result[10]) yesNext = `<a href="/blurbs/${Number(req.params.pageNum)+1}">Older Blurbs (Page ${Number(req.params.pageNum)+1})</a>`;
      else yesNext = ``;
      if(Number(req.params.pageNum) > 1) yesPrev = `<a href="/blurbs/${Number(req.params.pageNum)-1}">Newer Blurbs (Page ${Number(req.params.pageNum)-1})</a>`;
      else yesPrev = ``;
      let data = result.slice(0,10);
      res.send(partOne+`
      <title>Blurbs</title>
  `+partTwo+data.map(product =>`
      <a href="/${product.type}/${product.path}/">${product.title}</a><br>
      <p>${product.content}</p>`).join('')+yesPrev+yesNext+partThree)
      db.close();
    });
  });
});
app.get('/blurbs', (req, res) => {
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
    }, (err, db) => {
    if (err) throw err;
    var yesNext;
    var dbo = db.db("blogdb");
    dbo.collection("posts").find({type: "blurb"}).sort({date: -1}).limit(11).toArray(function(err, result) {
      let dataa = result.slice(0,10);
      let data = [];
      if (err) throw err;
      if(result[10]) yesNext = `<a href="/blurbs/2">Older Posts (Page 2)</a>`;
      dataa.forEach(element => {
        if(element.type == "blurb"){
          data.push({title:element.title, content:element.content, type:element.type, path:element.path});          
        }
      });
      res.send(partOne+`
    <title>Blurbs</title>
`+partTwo+data.map(product =>`
      <a href="/${product.type}/${product.path}/">${product.title}</a><br>
      <p>${product.content}</p>`).join('')+yesNext+partThree)
      db.close();
    });
  });
});

app.get('/post/:postId', (req, res) => {
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
    }, (err, db) => {
    if (err) throw err;
    var dbo = db.db("blogdb");
    dbo.collection("posts").findOne({path: req.params.postId}, function(err, item) {
      if (err) throw err;
      if (item){
        res.send(partOne+`<title>`+item.title+`</title>   
   `+partTwo+`
             <h1>`+item.title+`</h1>
              <p>`+item.content+`</p>
`+partThree)
      }else res.send(partOne+`
      <title>No Post</title>
   `+partTwo+`
      <h1>No Post</h1>
      <p>Sorry there does not seem to be a post here.</p>`+partThree);
      db.close();
    });
  });
});

app.get('/blurb/:blurbId', (req, res) => {
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
    }, (err, db) => {
    if (err) throw err;
    var dbo = db.db("blogdb");
    dbo.collection("posts").findOne({path: req.params.blurbId}, function(err, item) {
      if (err) throw err;
      if (item){
        res.send(partOne+`<title>`+item.title+`</title>   
   `+partTwo+`
             <h1>`+item.title+`</h1>
              <p>`+item.content+`</p>
`+partThree)
      }else res.send(partOne+`
      <title>No Blurb</title>
   `+partTwo+`
      <h1>No Blurb</h1>
      <p>Sorry there does not seem to be a blurb here.</p>`+partThree);
      db.close();
    });
  });
});

app.get('/about', (req, res) => {
res.send(partOne+`
      <title>About Me</title>
   `+partTwo+`
      <h1>About Me</h1>
      <p>Hey</p>
    `+partThree)
});

app.get('/friends', (req, res) => {
  res.send(partOne+`
      <title>Friends</title>
   `+partTwo+`
      <h1>Friends of g33k.me</h1>
  <p>ill update later</p>
`+partThree)
});
app.listen(config.port, () => console.log('Blog server opened on port '+config.port+'!'));