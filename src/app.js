require('dotenv/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.router')


const port = process.env.PORT || 3000
const mongo_string = process.env.MONGOOSE_URI


//Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(mongo_string);
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
};


//Middlewares
app.use(express.json());


//Middleware Route
app.use('/api/user', authRoute);


connectDB().then(() =>{
    app.listen(port, () => {
      console.log(`server start at http://localhost:${port}`);
    });
})
