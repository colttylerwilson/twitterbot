var Twitter = require('twitter');
var fs = require('fs');
var savePath = 'save.txt';
var tweetFile = 'tweetFile.txt';
const readline = require('readline');
var countLimit = 100;
var titlegen = require('titlegen');
var headlines = [];
var txt = [];

//-------------------------------------------
// Information for the twitter API
//-------------------------------------------
var client = new Twitter({
	consumer_key:         'uo8Ex8A6kPqQSTU9mQ4JEDCwA',
	consumer_secret:      'eoAftf2tIevLIxizgY7ku4qwn9lkVJtC8PbppR30ye0Kp89D3S',
	access_token:         '835704017384685569-946BgoVOlUWSNXhCmFKwNNDm2FCzwYz',
	access_token_secret:  '5equQy78EhdnBOXWrhvtUCd6EW4Y4f7Lqfzyeg4EEDB6Z'
});

//-------------------------------------------
// Deletes the tweet file to start from scratch
//-------------------------------------------
fs.unlink('tweetFile.txt', function(err) {
    if(err && err.code == 'ENOENT') {
        // file doens't exist
        console.info("File doesn't exist, won't remove it.");
    } else if (err) {
        // maybe we don't have enough permission
        console.error("Error occurred while trying to remove file");
    } else {
        console.info(tweetFile + " removed...\n\n");
    }
});

//-------------------------------------------
// Writes tweets to a text file
//-------------------------------------------
function writeHeadlines() {
	
	function getCNN()
	{
		var params = {screen_name: 'newsnightnow'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			if (!error) {
				console.log(tweets);
			}
			else
				console.log('error');
				//console.log(response);
		});
	}
	
/*
	for(var i = 0; i < countLimit; i++) {
				var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
				fs.appendFile(tweetFile, plainText, function(err) {
					if(err) {
						return console.log(err);
					}
				});
			}
			
			*/
	
	function fox(callback)
	{
	T.get('statuses/user_timeline', { screen_name: 'foxheadlines', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(tweetFile, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
				callback;
			});
		}
	});
	}
	
	function msnbc(callback)
	{
	T.get('statuses/user_timeline', { screen_name: 'MSNBC', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(tweetFile, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
				callback;
			});
		}
	});
	}
	
	function aj()
	{
	T.get('statuses/user_timeline', { screen_name: 'AJENews', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(tweetFile, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});
	}
	
	function rt()
	{
	T.get('statuses/user_timeline', { screen_name: 'RT_com', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(tweetFile, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});
	}
	
	function mlp()
	{
	T.get('statuses/user_timeline', { screen_name: 'mylittlepony', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(tweetFile, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});
	}
	
	function tt()
	{
	T.get('statuses/user_timeline', { screen_name: 'TeletubbiesUSA', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(tweetFile, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});
	}
	
	function ss()
	{
	T.get('statuses/user_timeline', { screen_name: 'sesamestreet', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(tweetFile, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});
	}
	
	function ds()
	{
	T.get('statuses/user_timeline', { screen_name: 'TheDrSeussQuote', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(tweetFile, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});
	}
	
	getCNN();
}

//-------------------------------------------
// Stores tweets in an array, each element of
// the array is 1 tweet.
//-------------------------------------------
function readHeadlines() {
	var lineReader = require('readline').createInterface({
		input: require('fs').createReadStream('tweetFile.txt')
	});

	lineReader.on('line', function (line) {
		
		headlines.push(line);
	});
}

//-------------------------------------------
// Generates a markov chain for the headlines
//-------------------------------------------
function markov()
{
	var generator = titlegen.create();
	generator.feed(headlines);
	saveHeadline(generator.next());
}

//-------------------------------------------
// Saves a headline and posts to twitter, 
// determined by the user
// plainText: headline provided by the markov 
// function
//-------------------------------------------
function saveHeadline(plainText) {
	console.log(plainText);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	
	rl.question('\n\nPost to Twitter and Save? (1 for Yes, 2 for No)	', 
	(answer) => 
	{
		// TODO: Log the data in a database
		if(answer == '1')
		{
			fs.appendFile(savePath, plainText + "\n", function(err) {
				if(err) {
					return console.log(err);
				}
				postToTwitter(plainText);
				rl.close();
			});
		}
		else
		{
			rl.close();
		}
	});
}

//-------------------------------------------
// Post the new markov headline to twitter
//-------------------------------------------
function postToTwitter(markovHeadline)
{
	T.post('statuses/update', { status: markovHeadline }, function(err, data, response) {
		console.log(data);
	})
}
function run()
{
	writeHeadlines();
}

run();