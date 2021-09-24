const express = require('express');
const route = express.Router();
const {register,getAll,login,temporeryDelete,restore,userDelete,userUpdate,passwordUpdate}= require('../controller/user');
const auth= require("../middlware/auth")
const permission = require("../middlware/permission")
const Delete = require("../middlware/delete")

route.get('/get-all',auth,permission(['teacher','student']),getAll);
route.post('/register',register);
route.post('/login',login);
route.delete('/recycle-bin/:id',temporeryDelete);
route.put('/restore/:id',restore);
route.delete('/delete/:id',Delete,userDelete);
route.put('/update/:id',userUpdate);
route.put('/pass-update/:id',passwordUpdate);


module.exports= route;