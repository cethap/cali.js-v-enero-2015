//objeto de conexión socket.io
var socket = io.connect(location.origin);

(function($){
	$(function(){

		socket.on('Linkiar', function (data) {
			location.href = data.href;
		});

		socket.on('newWinRecibe', function (data) {
			window.open(data.href);
		});

		var peer = new Peer('ty7rfai7afgeewmi',{host: 'wbrtc.herokuapp.com', port: 80, path: '/myapp'});

		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		peer.on('call', function(call) {
			navigator.getUserMedia({video: true, audio: true}, function(stream) {
				call.answer(stream); // Answer the call with an A/V stream.
				call.on('stream', function(remoteStream) {
					// Show stream in some <video> element.
					$("#v").prop('src', URL.createObjectURL(remoteStream));
				});
			}, function(err) {
				console.log('Failed to get local stream' ,err);
			});
		});


	});


	var Page = (function() {
		var config = {
			$bookBlock : $('#bb-bookblock'),
			$navNext : $('#bb-nav-next'),
			$navPrev : $('#bb-nav-prev'),
			$navFirst : $('#bb-nav-first'),
			$navLast : $('#bb-nav-last')
		},
		init = function() {
			config.$bookBlock.bookblock({
				speed : 1000,
				shadowSides : 0.8,
				shadowFlip : 0.4
			});
			initEvents();
		},
		initEvents = function() {
			var $slides = config.$bookBlock.children();
			// add navigation events
			config.$navNext.on('click touchstart', function() {
				config.$bookBlock.bookblock('next');
				return false;
			});
			config.$navPrev.on('click touchstart', function() {
				config.$bookBlock.bookblock('prev');
				return false;
			});
			config.$navFirst.on('click touchstart', function() {
				config.$bookBlock.bookblock('first');
				return false;
			});
			config.$navLast.on('click touchstart', function() {
				config.$bookBlock.bookblock('last');
				return false;
			});
			// add swipe events
			$slides.on({
				'swipeleft' : function(event) {
					config.$bookBlock.bookblock('next');
					return false;
				},
				'swiperight' : function(event) {
					config.$bookBlock.bookblock('prev');
					return false;
				}
			});
			// add keyboard events
			$(document).keydown(function(e) {
				var keyCode = e.keyCode || e.which,
				arrow = {
					left : 37,
					up : 38,
					right : 39,
					down : 40
				};
				switch (keyCode) {
					case arrow.left:
					config.$bookBlock.bookblock('prev');
					break;
					case arrow.right:
					config.$bookBlock.bookblock('next');
					break;
				}
			});
		};
			return { init : init };
	})();

    Page.init();

    window.onhashchange = function(){
		var h = location.hash.split("#/");
		h = parseInt(h[h.length-1],10);
		console.log(h);
		_j.jump(h);
    };

})(jQuery);
