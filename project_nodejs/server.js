var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var cookieParser = require("cookie-parser");
var session = require("express-session");

var mongoose = require('mongoose');
var cors = require('cors');

//Configurations
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(session({secret: 'This is a secret key'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

/* enable CORS*/
app.use(cors());


var mongoDBString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/Project';
mongoose.connect(mongoDBString);


//START: Project Code


//schema design
var UserSchema = mongoose.Schema({
	userid: String,
	password: String,
	email : String,
	pages : [{
		pageTitle   : String,
		notes		: [{
			title	: String,
			text	: String
		}],
		bookmarks	: [{
			title	: String,
			url		: String
		}],
		medias		: [{
			title	: String,
			url		: String
		}],
		images		: [{
			title	: String,
			image	: Buffer
		}]
	}]

}, { collection: 'user' });


var UserModel = mongoose.model('UserModel', UserSchema);

/*************TAGS SCHEMA**************/
var TagSchema = mongoose.Schema({
	_creator   	: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionModel' },
	text 		: String,
	questions 	: [{ type: mongoose.Schema.Types.ObjectId , ref: 'QuestionModel'}],
}, { collection	: 'tag' });


var TagModel = mongoose.model('TagModel', TagSchema);


/*************QUESTIONS SCHEMA**************/
var QuestionSchema = mongoose.Schema({
	_id     : mongoose.Schema.Types.ObjectId,
	created_by : String,
	title 	: String,
	description : String,
	answers : [{user: String, answer: String}],
	likes : [String],
	visits : Number,
	tags : [{ text: String }],
	created : {type: Date, default: Date.now} 

}, { collection: 'question' });


var QuestionModel = mongoose.model('QuestionModel', QuestionSchema);





/*************LOGIN CONFIG**************/

//session 
passport.use(new LocalStrategy({
	usernameField: 'userid',
	passwordField: 'password'
},
function(username, password, done)
{

	UserModel.findOne({userid: username, password: password}, function(err, user){
//		console.log(user);
		if (err) { 
			return done(err); }
		if (!user) { 
			return done(null, false); }

		return done(null, user); })
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});


//authentication
var auth = function(req, res, next)
{
	if (!req.isAuthenticated())
		res.send(401);
	else
		next();
};

//register
app.post('/register', function(req, res)
		{
	var newUser = req.body;
//	newUser.roles = ['student'];
	UserModel.findOne({userid: newUser.userid}, function(err, user)
			{
		if(err) { return next(err); }
		if(user)
		{
			res.json(null);
			return;
		}
		var newUser = new UserModel(req.body);
		newUser.save(function(err, user)
				{
			req.login(user, function(err)
					{
				if(err) { return next(err); }
				res.json(user);
					});
				});
			});
		});


//login
app.post("/login", passport.authenticate('local'), function(req, res){
	var user = req.user;
//	console.log(user);
	res.json(user);
});


//authorize
app.get('/loggedin', function(req, res)
		{
	res.send(req.isAuthenticated() ? req.user : '0');
		});

//profile details of user
app.get("/profile", auth, function(req, res){
	var user = req.user;
	UserModel.findOne({userid: user.userid, password: user.password} , function(err, users){
		res.json(users);
	})
});


//logout
app.post('/logout', function(req, res)
		{
	req.logOut();
	res.send(200);
		});  
/*****************************NEW PART BELOW*************************************************/
//var t1 = new TagModel({
//	tag : "demo"
//})
//var q1 = new QuestionModel({
//	title: "this is a demo question",
//	description :"Donot read this question as this is a demo  question. Your time will be wasted",
//	answers : ["this is a demo answer", "This is the worst question ever"],
//	tags : [],
//})
//
//t1.save();
//q1.save();

//DELETE SCHEMA CREATION LATER
//var user1 = new UserModel({
//userid: "aaa",
//password: "aaa",
//email : "aaa.gmail.com",
//pages : [{
//pageTitle   : "DemoPage",
//notes		: [{
//title	: "DemoNote",
//text	: "I have  not written anything yet this appears"
//}],
//bookmarks	: [
//{
//title	: "Bootstrap bookmark created from backend",
//url		: "http://getbootstrap.com/components/"
//},
//{
//title	: "Google bookmark created from backend",
//url		: "https://www.google.com/?gws_rd=ssl"
//},
//],
//medias		: [{
//title	: "Youtube Song added",
//url		: "https://www.youtube.com/watch?v=HXsC9r-hYzg"
//}],
//images		: []
//},
//{
//pageTitle :"Empty Page",
//notes : [],
//bookmarks : [],
//medias : [],
//images: []
//}]
//});
//user1.save();


/*************************************** All Requests for Pages *************************/
//get all pages of a user
app.get("/pages/:data", function(req, res){
	var userid = req.params.data;
	UserModel.findOne({userid: userid} , function(err, usr){
		//console.log(usr);
		res.json(usr.pages);
	})
});

//create a new blank page for the given user
app.post("/pages", function(req, res){

	UserModel.findOne({userid: req.body.userid} , function(err, doc){
		//console.log(usr);
		var newpage = {
				pageTitle :req.body.title,
				notes : [],
				bookmarks : [],
				medias : [],
				images: []
		}

		doc.pages.push(newpage)
		doc.save(function(err,doc){
			res.json(doc.pages);
		});
	})
});

//delete a page from user
app.delete("/pages/:pageid/:userid", function(req, res){
	console.log("pageid = "+ req.params.pageid);
	console.log("userid = "+ req.params.userid);
	UserModel.findOne({userid: req.params.userid} , function(err, doc){
		doc.pages.forEach(function(page , key){
			if(page._id == req.params.pageid){
				doc.pages.splice(key, 1);

			}
		})
		doc.save(function(err,doc){
			res.json(doc.pages);
		});
	})
});

/*************************************** All Requests for Widgets *************************/
//create a new widget for the given user
app.post("/new", function(req, res){
	var currentPage = null;
	var newObj = null;
	UserModel.findOne({userid: req.body.userid} , function(err, doc){
		//console.log(usr);
		switch(req.body.type){
		case "note":
			newObj = {
				title:"Notes",
				text : "This is a new note"

		}
			doc.pages.forEach(function(page , key){
				if(page._id == req.body.pageid){
					page.notes.push(newObj);
					currentPage = page;
				}
			})
			doc.save(function(err,doc){
				res.json(currentPage.notes);
			});
			break;
		case "bookmark":
			newObj = {
				title:"Bookmark",
				url : "Please provide an url"

		}
			doc.pages.forEach(function(page , key){
				if(page._id == req.body.pageid){
					page.bookmarks.push(newObj);
					currentPage = page;
				}
			})
			doc.save(function(err,doc){
				res.json(currentPage.bookmarks);
			});
			break; 
		case "media":
			newObj = {
				title: "Media Title",
				url : "none"

		}
			doc.pages.forEach(function(page , key){
				if(page._id == req.body.pageid){
					page.medias.push(newObj);
					currentPage = page;
				}
			})
			doc.save(function(err,doc){
				res.json(currentPage.medias);
			});
			break; 

		default : break;
		}
	})
});



//save a widget for the given user
app.put("/save", function(req, res){
	var currentPage = null;
	var newObj = null;
	
	switch(req.body.type){
		case "note":
	
			var notes = req.body.notes;
			notes.forEach(function(v){ delete v._id });
			//console.log(notes);

			UserModel.update({userid: req.body.userid, "pages._id": req.body.pageid},
					{$set: {'pages.$.notes': notes}},
					function(err, count){
			});
			
			break;
		case "bookmark":
			var bookmarks = req.body.bookmarks;
			bookmarks.forEach(function(v){ delete v._id });
			console.log(bookmarks);

			UserModel.update({userid: req.body.userid, "pages._id": req.body.pageid},
					{$set: {'pages.$.bookmarks': bookmarks}},
					function(err, count){
			});
			break; 
		case "media":
			var medias = req.body.medias;
			medias.forEach(function(v){ delete v._id });
			//console.log(notes);

			UserModel.update({userid: req.body.userid, "pages._id": req.body.pageid},
					{$set: {'pages.$.medias': medias}},
					function(err, count){
			});
			break; 
	
		default : break;

	}
	
});


/*********************************Questions and tags******************************************/
//get all questions, answers and fav qns of a user
app.get("/userasked/:data", function(req, res){
	var userid = req.params.data;
	QuestionModel.find({created_by: userid} , function(err, docs){
//		console.log(docs);
		res.json(docs);
	})
});
app.get("/useranswered/:data", function(req, res){
	var userid = req.params.data;
	QuestionModel.find({'answers.user': userid} , function(err, docs){
//		console.log(docs);
		res.json(docs);
	})
});
app.get("/userliked/:data", function(req, res){
	var userid = req.params.data;
	QuestionModel.find({'likes': userid} , function(err, docs){
		res.json(docs);
	})
});


//ask a question
app.post("/ask", function(req, res){
	console.log(req.body);

	var newTags = []
	var qn = new QuestionModel({ 
		_id: mongoose.Types.ObjectId(), 
		created_by: req.body.userid,
		title: req.body.title, 
		description: req.body.description,
		answers: [],
		likes:[],
		visits: 0,
		tags:req.body.tags
	});

//	QuestionModel.create(req.body, function(err, doc){
//		res.json(doc);
//	});
	
	qn.save(function (err, doc) {
		req.body.tags.forEach(function(tag, key){

			TagModel.findOne({text : tag.text.toLowerCase()}).exec(function(err, gotTag){

				if(gotTag)
				{  
//					console.log("found");
					gotTag.questions.push(mongoose.Types.ObjectId(qn._id));
					gotTag.save(function (err) {
						newTags.push(gotTag);
//						console.log("tag saved");
					});
				}else{
//					console.log("not found");
					var tag1 = new TagModel({
						_creator: qn._id, 
						text: tag.text,
						questions: []
					});
					tag1.questions.push(mongoose.Types.ObjectId(qn._id));
					tag1.save(function (err) {
//						console.log("tag saved");
						newTags.push(tag1);
					});
				}
			})			
		});
		res.json(qn._id);
		
	});
	
	
	
});

app.get("/questions", function(req, res){
	
	QuestionModel.find().exec(function(err, qns){
		res.json(qns);
	})
	
});

app.get("/questionAnswer/:qid", function(req, res){
	
	QuestionModel.findOneAndUpdate({_id: req.params.qid} , {$inc :{visits : 1}}, 
						{ upsert : true }, function(err, doc){
			QuestionModel.find({_id: req.params.qid}).exec(function(err, doc){
				res.json(doc);
			});
	});
});

app.get("/tags", function(req, res){
	
	TagModel.find().exec(function(err, tags){
		res.json(tags);
		
	})
});

//get questions related to a tag 
app.get("/tagQuestion/:tag", function(req, res){
	
	QuestionModel.find({'tags.text': req.params.tag}).exec(function(err, qns){
		res.json(qns);
	})
	
});

//add answers to a qn 
app.post("/answer", function(req, res){
	console.log(req.body);
	var qid = req.body.qid;
	var ans = req.body.ans;
	
	QuestionModel.update({_id: qid} , {$push: {answers: ans}}, {safe: true, upsert: true}, function(err, doc){
		QuestionModel.find({_id: qid} ,function(err, doc){
			res.json(doc);
		})
	})
	
});

//search for questions 
app.post("/search", function(req, res){
//	console.log(req.body.text);
	QuestionModel.find({
		$or: [{title: new RegExp(req.body.text, 'i')}, 
		      {description: new RegExp(req.body.text, 'i')}] })
		.exec(function(err, qns){
		res.json(qns);
	})
	
});



//like and dislike
//search for questions 
app.post("/dislike", function(req, res){
	QuestionModel.update({_id: req.body.qid} , {$pull: {likes: req.body.userid}}, {safe: true, upsert: true}, function(err, doc){
		QuestionModel.find({_id: req.body.qid} ,function(err, doc){
			res.json(doc);
		})
	})
	
});
app.post("/like", function(req, res){
//	console.log(req.body);
	QuestionModel.update({_id: req.body.qid} , {$push: {likes: req.body.userid}}, {safe: true, upsert: true}, function(err, doc){
		QuestionModel.find({_id: req.body.qid} ,function(err, doc){
			res.json(doc);
		})
	})
	
});
//END: Project Code

//Profile Page

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ip);