//i gonna put the express into a variable
const express = require('express');
const cors = require("cors");
// const jwt = require('jsonwebtoken');
const app = express()
// const sql = require('mysql2')
const morgan = require('morgan')
const sequelizeSetup = require('./dbSetup/sequelizeSetup')
require('dotenv').config()

//////
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/' , (req , res)=>{
  res.json({
    Data : null , 
    Massage : "Hello from api app !" ,
    // logging: false
  })
})

const moviesRouter = require('./routes/moviesRoutes');
const usersRouter = require('./routes/usersRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const feedBacksRouter = require('./routes/feedBackRoutes')

app.use('/api/users' , usersRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/Movies' , moviesRouter)
app.use('/api/feedBacks' , feedBacksRouter)
app.use(moviesRouter);

const port = process.env.PORT || 4040
app.listen(port , ()=>{
  console.log(`server is running on port => ${port}`)
})
  