const express = require("express");
const mongoose=require("mongoose");
require('dotenv').config()

const  app = express();
app.use(express.json())

const coursesRouter = require('./routes/courses')
app.use('/courses',coursesRouter)
const customerRouter=require('./routes/customer');
app.use('/customer',customerRouter)
const publisherRouter=require('./routes/publisher');
app.use('/publisher',publisherRouter)
const adminRouter=require('./routes/admin');
app.use('/admin',adminRouter)
const helpRouter=require('./routes/help');
app.use('/help',helpRouter)
const cartRouter=require('./routes/cart');
app.use('/cart',cartRouter)
const paymentRouter=require('./routes/payment');
app.use('/payment',paymentRouter)




mongoose.connect(process.env.DB_KEY)
const db =mongoose.connection
db.on('error',(error)=>{console.log(error)})
db.once('open',()=>{
    console.log('db connect')
    app.listen(process.env.PORT||3000,()=>{
        console.log("server run")
    })
})

