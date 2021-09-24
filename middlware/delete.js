module.exports= function (req,res,next) {
    const token= req.header('Authorization');
    if(!token){
        return res.json({
            mgs: "Sorry u cannot delete"
        })
    }
    else{
        next();
    }
}