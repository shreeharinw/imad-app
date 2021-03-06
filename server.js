var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    articleone : 
    {
        title:'article 1',
       heading:'article one',
       date: '01 jan 2018',
       content: `
        <p> Born to a Gujarati family in Vadnagar, Modi helped his father sell tea as a child, and later ran his own stall. </p>`
    },
    
    articletwo : { title:'article 2',
       heading:'article two',
       date: '05 feb 2018',
       content: `
        <p> He was introduced to the RSS at the age of eight, beginning a long association with the organisation. </p>`},
        
    articlethree : { title:'article 3',
       heading:'article three',
       date: '06 apr 2018',
       content: `
        <p>  He left home after graduating from school, partly because of an arranged marriage which he . </p>`}
};
 
    

function createtemplate(data) {
var title = data.title;
var heading = data.heading;
var content = data.content;
var date = data.date;

var htmlTemplate = `
<html>
    <head>
        <title>
        ${title}
        </title>
        <meta name="viewport" content="width-device-width,initial scale=1"/>
         <link href="/ui/style.css" rel="stylesheet"/>
    </head>
    <body>
        <div class="article_section">
            <a href = "/">Home</a>
            <hr/>
            <h1>
               ${heading}
            </h1>
            <div>
               ${date}
            </div>
            <div>
            <p>
                ${content}
            </p>
            </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter +1 ;   
  res.send(counter.toString());
});

app.get('/:articleName', function (req, res) {
  var articlename =req.params.articleName;    
  res.send(createtemplate(articles[articlename]));
});

app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
