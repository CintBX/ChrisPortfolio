const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Activate dotenv for secure keys
dotenv.config();


// Middleware to recognize incoming Request Object as a JSON object
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Bind Routes
const commissions = require('./routes/api/commissions');
const projects = require('./routes/api/projects');
const users = require('./routes/api/users');
// Use Routes
app.use(cors());
app.use('/commissions', commissions);
app.use('/projects', projects);
app.use('/users', users);


// Mongo connect
mongoose
  .connect(process.env.URI || process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));


// For Deployment
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
};


// Run server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));