var Twit = require('twit')
var fs = require('fs');
const readline = require('readline');
var filePath = 'test.txt';
var countLimit = 100;
var titlegen = require('titlegen');
var headlines = [];
var savePath = 'save.txt';

//-------------------------------------------
// Information for the twitter API
//-------------------------------------------
var T = new Twit({
	consumer_key:         'ZAP3GewbUCBCzYgxuUUN13wxI',
	consumer_secret:      'OT983RL4A3YETMjPIgluPoEZUl2LAvhqzPrg8GsflYa1pTf4lS',
	access_token:         '835704017384685569-946BgoVOlUWSNXhCmFKwNNDm2FCzwYz',
	access_token_secret:  '5equQy78EhdnBOXWrhvtUCd6EW4Y4f7Lqfzyeg4EEDB6Z'//,
	//timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

//-------------------------------------------
// Deletes the text file to start from scratch
//-------------------------------------------
function deleteFiles() {
fs.unlink('test.txt', function(err) {
    if(err && err.code == 'ENOENT') {
        // file doens't exist
        console.info("File doesn't exist, won't remove it.");
    } else if (err) {
        // maybe we don't have enough permission
        console.error("Error occurred while trying to remove file");
    } else {
        console.info(filePath + " removed.\n\n");
    }
});
}

//-------------------------------------------
// Writes tweets to a text file
//-------------------------------------------
function writeHeadlines() {
	T.get('statuses/user_timeline', { screen_name: 'cnni_headlines', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(filePath, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});

	T.get('statuses/user_timeline', { screen_name: 'foxheadlines', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(filePath, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});


	T.get('statuses/user_timeline', { screen_name: 'MSNBC', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(filePath, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});

	T.get('statuses/user_timeline', { screen_name: 'AJENews', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(filePath, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});

	T.get('statuses/user_timeline', { screen_name: 'RT_com', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(filePath, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});
}

function writeHeadlines2()
{
		T.get('statuses/user_timeline', { screen_name: 'mylittlepony', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(filePath, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});
	
	T.get('statuses/user_timeline', { screen_name: 'TeletubbiesUSA', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(filePath, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});
	
	T.get('statuses/user_timeline', { screen_name: 'sesamestreet', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(filePath, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});
	
	T.get('statuses/user_timeline', { screen_name: 'TheDrSeussQuote', count: countLimit }, function(err, data, response) {
		for(var i = 0; i < countLimit; i++) {
			var plainText = data[i].text.replace(/\bhttp\S+/ig,"") + "\n";
			fs.appendFile(filePath, plainText, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
	});
}

//-------------------------------------------
// Stores tweets in an array, each element of
// the array is 1 tweet.
//-------------------------------------------
function readHeadlines() {
	var lineReader1 = require('readline').createInterface({
		input: require('fs').createReadStream('test.txt')
	});

	lineReader1.on('line', function (line) {
		headlines.push(line);
	});
	
	var lineReader2 = require('readline').createInterface({
	input: require('fs').createReadStream('save.txt')
	});

	lineReader2.on('line', function (line) {
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
	
	rl.question('Post to Twitter and Save? (1 for Yes, 2 for No)	', 
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

	deleteFiles();
	setTimeout(writeHeadlines, 200);
	setTimeout(writeHeadlines2, 1000)
	setTimeout(readHeadlines, 3000);
	setTimeout(markov, 4000);