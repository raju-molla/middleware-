const express = require('express');
const app = express();
require('dotenv').config();
const userRoute = require('./route/user');
const mongoose = require('mongoose');

app.use(express.json());
app.use('/user',userRoute);

app.get('/',(req,res)=>{
    res.json({
        mgs: 'This is Home page'

    })
})

app.get('*',(req,res)=>{
    res.json({
        mgs: 'The route cound not found'
    })
})
//database
mongoose.connect('mongodb://localhost:27017/student').then(()=> console.log('database connected'))
.catch((err)=>{
    console.log(err);
})

// server
const port = process.env.PORT;
app.listen(port,()=>console.log(`The server is running at port ${port}`)); 
