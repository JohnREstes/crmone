const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = `mongodb+srv://support:${process.env.MONGO_DB_PW}@johnetravelsapi.oni63tx.mongodb.net/test?retryWrites=true&w=majority&appName=JohnETravelsAPI`;

mongoose
  .connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
