const express = require('express');
const app = express();
app.listen('4000');

const mongoose = require('mongoose');
const dbUrl = 'mongodb://127.0.0.1:27017/test';
mongoose.connect(dbUrl,
	{ useNewUrlParser: true,  useUnifiedTopology: true },
	() => {console.log('connected to db')}
	);

//router
const postRoute = require('./routes/posts');
app.use('/posts',postRoute);
const authRoute = require('./routes/auth');
app.use('/users', authRoute); 


const entryPoint = (req, res) => {
	res.json({title: 'node server started..'});
};
app.get('/',entryPoint);