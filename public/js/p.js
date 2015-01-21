//objeto de conexión socket.io
var socket = io.connect(location.origin);

(function($){

	// var peer = new Peer({host: 'wbrtc.herokuapp.com', port: 80, path: '/myapp'});
	// var inVideoStado = false;
	// peer.on('open', function(id) {
	// 	console.log('My peer ID is: ' + id);
	// });

	$(function(){
		//Evento click de los items
		$("a").click(function(e){
			e.preventDefault();
			var el = $(this);

			$(".list li").each(function(){
				$(this).removeClass("active");
			});

			el.parents("li").addClass("active");

			if(typeof el.attr("data-href") !== "undefined"){
				//Envia o emite datos al server socket 
				//para siguiente pagina del libro de la presentacion
				socket.emit('sendLink',{href:el.attr("data-href")});
			}else if(typeof el.attr("data-new") !== "undefined"){
				//Envia o emite datos al server socket para 
				//abrir una nueva ventana con el ejemplo
				socket.emit('sendWin',{href:el.attr("data-new")});
				location.href = el.attr("data-local");
			}
		});


		// $(".videoChat").click(function(e){
		// 	if(!inVideoStado){			
		// 		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		// 		navigator.getUserMedia({video: true, audio: true}, function(stream) {
		// 			var call = peer.call('ty7rfai7afgeewmi', stream);
		// 			call.on('stream', function(remoteStream) {
		// 				// Show stream in some <video> element.
		// 				//$("#v").prop('src', URL.createObjectURL(remoteStream));
		// 			});
		// 		}, function(err) {
		// 			console.log('Failed to get local stream' ,err);
		// 		});
		// 		inVideoStado = true;
		// 	}
		// });

	});
})(jQuery);