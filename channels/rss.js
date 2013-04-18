;!function(exports, undefined) {
	var articleModelFields = [
		{
			name:'title',
			label: 'Title',
			type: 'Text',
			required: true
		},
		{
			name:'description',
			label: 'Description',
			type: 'Text',
			required: true
		},
		{
			name:'summary',
			label: 'Summary',
			type: 'Text'
		},
		{
			name:'link',
			label: 'Title',
			type: 'Text',
			required: true
		}
	];
	
	var channel = {
		name: 'rss',
		url: false
	};
	
	channel.init = function(callback){
		var self = this;
		
		if(!this.interval){
			this.interval = 300;
		}
		
		this.Models.Article = new this._Model({
			name: 'Article',
			fields: articleModelFields
		});
		
		fetchFeed.call(this);
		
		this.Timer = setInterval(function(){
			fetchFeed.call(self);
		}, (this.interval*1000));
		
	    if(callback){
	    	callback(this);
	    }
	}
	
	function fetchFeed(){
		var self = this;
		
		var request = require('request');
		var zlib = require('zlib');		
		var FeedParser = require('feedparser');
		
		var name = self.name;
		var url = self.url;
		
		if(!url){
			throw new Error('No Feed URL Supplied');	
		}
		
		var urlParts = require('url').parse(url);
			
		var reqObj = urlParts;
		
		request(self.url)
		  .pipe(new FeedParser())
		  .on('error', function(error) {
		    // always handle errors
		  })
		  .on('meta', function (meta) {
		    // do something
		  })
		  .on('article', function (article) {
		    // do something else
		    var articleEntity = new self._Entity(self.Models.Article, article);
			self.emit('entity', articleEntity);
		  })
		  .on('end', function () {
		   // do the next thing
		  });
			
		/*require('http').get(reqObj, function (res, body){
			var body = "";
				
		    res.on('error', function(err) {
		       next(err);
		    });
			
		    var output;
		    if( res.headers['content-encoding'] == 'gzip' ) {
		    	var gzip = zlib.createGunzip();
		    	res.pipe(gzip);
		    	output = gzip;
		    } else {
		    	output = res;
		    }
			
		    output.on('data', function (data) {
		       data = data.toString('utf-8');
		       body += data;
		    });
			
		    output.on('end', function() {
				var feedParser = new fpObj({});
				
				feedParser.on('error', function(){
					console.log(arguments);
				});		
				
				feedParser.on('article', function(article){
					var articleEntity = new self._Entity(self.Models.Article, article);
					self.emit('entity', articleEntity);
				});
				
				feedParser.parseString(body);
		    });
	    });*/
	}
	
	if (typeof define === 'function' && define.amd) {
		define(function() {
			return channel;
		});
	} else {
		exports.Channel = channel;
	}

}(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? exports : window);