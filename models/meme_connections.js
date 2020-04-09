var mongoose=require('mongoose');

var memeSchema=new mongoose.Schema({
	
	title:String,
	image:String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"user"
		},
		username:String
	},
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
  			 ]
	
});

module.exports= mongoose.model("meme",memeSchema);