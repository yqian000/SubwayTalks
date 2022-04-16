const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});

// view are written in ejs, view engine converts ejs to html
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
const post = require('./models/Post');
const postSchema = post.postSchema;
const Post = new mongoose.model('Post', postSchema);

app.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('index', { posts: posts });
})

app.get('/newPost', (req, res) => {
    res.render('newPost');
})

app.post('/newPost', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
    });
    await post.save();
    res.redirect('/');
})

app.listen(port, () => console.log('Listening to port ${port}'));