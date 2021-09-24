const jwt= require("jsonwebtoken");
module.exports= function (req,res,next) {
    const token = req.header('Authorization')
    if(!token){
        return res.json({
            mgs: "Your are not login in this time!"
        })
    }
    const data = jwt.verify(token,process.env.SECRATE_KEY);
    req.user=data
    next()
}