
exports.run = function(io){
	io.sockets.on('connection', function (socket) {
		socket.on('sendLink', function (data) {
			io.sockets.emit('Linkiar', data);
		});
		socket.on('sendWin', function (data) {
			io.sockets.emit('newWinRecibe', data);
		});
	});
};