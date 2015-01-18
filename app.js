
/**
 * Module dependencies.
 */

var express = require('express'),
    app = express(),
    presentacion = require('./routes/presentacion'),
    server = require('http').createServer(app),
    path = require('path'),
    io = require('socket.io').listen(server),
    sockets = require('./routes/sockets');


server.listen(process.env.PORT || 3000);

// var PeerServer = require('peer').PeerServer;
// var server = new PeerServer({port: 9000, path: '/myapp'});


// server.on('connection', function(id) {
//   console.log(id,"...........");
// });



app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', presentacion.index);
app.get('/movil', presentacion.movil);
app.get('/code', presentacion.code);
app.get('/cv', presentacion.cv);

sockets.run(io);