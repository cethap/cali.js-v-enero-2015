var fs = require('fs');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.render('presentacion', {});
};

exports.movil = function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.render('movil', {});
};

exports.cv = function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.render('cv', {});
};

exports.code = function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  var tpo = req.query.tipo;

  var html = fs.realpathSync(__dirname+'/../public/codes/'+req.query.code);
  html = fs.readFileSync(html);

  res.render('code', {tipo:"/"+tpo+"/"+tpo+".js", code:html, title:"codemirror"});
};
