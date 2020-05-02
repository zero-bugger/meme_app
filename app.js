//***** Meme App *****//

//Importing libraries
require('dotenv').config()
var bodyparser= require('body-parser');
var mongoose=require('mongoose');
var methodoverride=require('method-override');
var express=require('express');
var passport=require('passport');
var flash=require('connect-flash');
var LocalStrategy=require('passport-local');
var meme=require('./models/meme_connections');
var seeddb=require('./seed');
var User=require('./models/User')
var Comment=require('./models/comments')
var app=express();
var commentRoute=require('./routes/commentroute');
var indexRoute=require('./routes/indexroute');
var memeRoute=require('./routes/memeroute');

//APP Setup //

//Passport configuration//
app.use(require("express-session")({
	secret:"I love programming",
	resave:false,
	saveUninitialized:false
}));

// app.use(require("cookie-session")({
// 	name: 'session',
//     keys: ['key1', 'key2']
// }));

// app.use(function (req, res, next) {
//   req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge
// });
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentuser=req.user; 

	next();
})
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodoverride("_method"));


//seeddb(); //seeding the database

//MONGO DB SETUP//

// mongoose.connect("mongodb://localhost:27017/memeapp",{useNewUrlParser:true});
mongoose.connect(process.env.DATABASE,
				{
				 useNewUrlParser:true,
				 useCreateIndex:true,
				 useUnifiedTopology:true
				}
				).then(()=>{
					console.log("DB Connected!");
				}).catch((err)=>{
					console.log(err)
				})		

//Routers
app.use(indexRoute);
app.use(memeRoute);
app.use(commentRoute);

var port = process.env.PORT || 3000

app.listen(port,()=>{
		console.log(`App running on port ${port}`);
});
