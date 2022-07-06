const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.port

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const connectDB = require('./config/db')
connectDB()

app.use('/', require('./routes/userRoute'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(port, () => {
    console.log(`Listening On Port ${port}...`)
})