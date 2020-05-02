const  middlewareobj={}


middlewareobj.isloggedin=(req,res,next)=>{
	
	if(req.isAuthenticated()){
		return next();
	}
	
	res.redirect("/login");
}


module.exports = middlewareobj;