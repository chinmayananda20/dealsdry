const mongoose = require('mongoose'); 
mongoURI = "mongodb://localhost:27017/dealsdry" 

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}
module.exports = connectToMongo;