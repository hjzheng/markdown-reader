var express = require('express');
var router = express.Router();
var mdPath = 'markdown';
var marked = require('marked'); 


marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true
});

var fs = require("fs");

var file = fs.readdirSync(mdPath);

router.get('/', function(req, res){
  var file = fs.readdirSync(mdPath);  
  res.render('markdown', {"mdFiles": file, "mdContent": "<h1 class='title_center'>Welcome to markdown-reader</h1>", fileName: ""});
});

/* md page. */
router.get('/:file', function(req, res) {
  var mdFile = fs.readFileSync( mdPath + "/" + req.param('file') ,"utf-8");
  var html = marked(mdFile);
  res.render('markdown', {"mdFiles": file, "mdContent": html, "fileName": req.param('file')});
});

module.exports = router;
