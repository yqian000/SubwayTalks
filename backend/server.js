const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});

// Check if the connection to MongoDB was successfully established
const connection = mongoose.connection; 
connection.once('open', () => {
    console.log( "MongoDB database connection established successfully");
});

// view are written in ejs, view engine converts ejs to html
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;
//const post = require('./models/Post');
//const postSchema = post.postSchema;
//const Post = new mongoose.model('Post', postSchema);

//-----------ADDED------------------------------------
const trainRoutes = require('./routers/Train.router');
const postRoutes = require( './routers/Post.router');

app.use('/trains', trainRoutes);
app.use('/posts', postRoutes);
//------------------------------------------------------


// app.get('/', async (req, res) => {
//     const posts = await Post.find();
//     res.render('index', { posts: posts });
// })

// app.get('/newPost', (req, res) => {
//     res.render('newPost');
// })

// app.post('/newPost', async (req, res) => {
//     const post = new Post({
//         title: req.body.title,
//         body: req.body.body,
//     });
//     await post.save();
//     res.redirect('/');
// })

app.listen(port, () => console.log(`Listening to port ${port}`));