;!function(exports, undefined) {
	
	var feedChannel = require(__dirname+'/channels/rss.js').Channel;
	
	var channels = {
		Feed: feedChannel
	};
	
	if (typeof define === 'function' && define.amd) {
		define(function() {
			return channels;
		});
	} else {
		exports.Channels = channels;
	}

}(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? exports : window);