//***** Meme App *****//

//Importing libraries

var bodyparser= require('body-parser');
var mongoose=require('mongoose');
var methodoverride=require('method-override');
var express=require('express');
var passport=require('passport');
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
	secret:"I love Komal",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.use(function(req,res,next){
	res.locals.currentuser=req.user; 
	next();
})
//seeddb(); //seeding the database

//MONGO DB SETUP//

// mongoose.connect("mongodb://localhost:27017/memeapp",{useNewUrlParser:true});
mongoose.connect("mongodb+srv://zerobugger:613bbchz123ccmeme@cluster0-2dcwv.mongodb.net/test?retryWrites=true&w=majority//",
				{
				 useNewUrlParser:true,
				 useCreateIndex: true,
				 useUnifiedTopology: true
				}
				); 

//Routers
app.use(indexRoute);
app.use(memeRoute);
app.use(commentRoute);


app.listen(3000,function(){
	
	console.log("Server Started ------------>")
})