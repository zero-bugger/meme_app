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

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.use(flash());


//Passport configuration//
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
	res.locals.currentuser=req.user; 
	
	next();
})



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

const port = process.env.PORT || 3000

app.listen(process.env.PORT,()=>{
		console.log(`App running on port ${port}`);
});
