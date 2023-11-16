require('dotenv').config()
require('express-async-errors')

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')

const { readdirSync } = require("fs")


const express = require('express');
const app = express()

const connectDB = require('./db/connect')



const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handle')

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(helmet())
app.use(cors())
app.use(xss())
app.get('/', (req, res)=>{
    res.send('Blog API')
})
 
readdirSync("./routes").map((path) =>
  app.use("/api/v1/", require(`./routes/${path}`))
);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


 


const port = process.env.PORT || 4000

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening on port ${port}. . .`))
    } catch (error) {
        console.log(error);   
    }
}

start()  