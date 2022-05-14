const router = require('express').Router();

let Post = require( '../models/Post.model');

router.route('/').get( (req,res) => {
    Post.find()
    .then( posts => res.json(posts))
    .catch( err => res.status(400).json('Error: ' + err));
} )

router.route('/add_post').post( (req, res) =>{
    const username = req.body.username;
    const trainName = req.body.trainName;
    const stationName = req.body.stationName;
    const title = req.body.title;
    const body = req.body.body; 
    const overallRating = req.body.overallRating ; 
    const dangerLevel = req.body.dangerLevel;
    const date = req.body.date; 
    const numberOfVotes = req.body.numberOfVotes; 
    const numberOfComments = req.body.numberOfComments;
    const isUp = req.body.isUp; 
    const isDown = req.body.isDown;
    const comments = req.body.comments;
    const station_id = req.body.station_id;

    const newPost = new Post({
        username,
        trainName,
        stationName,
        title, 
        body,
        overallRating,
        dangerLevel,
        date,
        numberOfVotes,
        numberOfComments,
        isUp,
        isDown,
        comments,
        station_id
    });
    
    newPost.save()
    .then( () => {
        res.json("Post added!");
        console.log("Post added!");
    })
    .catch( err => res.status(400).json('Error: ' + err) );

} )

router.route('/get/:id').get( (req,res) =>{
    Post.findById( req.params.id)
    .then( post => res.json(post))
    .catch( err => res.status(400).json('Error: ' + err));
});

// ADDED
router.route('/get/post/:station_id').get( (req,res) =>{
    
    Post.find( {station_id: `${req.params.station_id}` } ).exec()
    .then( post => res.json(post))
    .catch( err => res.status(400).json('Error: ' + err));

});
// ^ADDED



router.route('/delete/:id').delete( (req,res) =>{
    Post.findByIdAndDelete(req.params.id)
    .then( () => res.json('Post deleted'))
    .catch( err => res.status(400).json('Error: ' + err) ) ; 

})


router.route( '/update/:id').post( (req,res) => {
    Post.findById(req.params.id)
    .then( post => {
        post.trainName = req.body.trainName; 
        post.stationName = req.body.stationName;
        post.title = req.body.title; 
        post.body = req.body.body; 
        post.overallRating = req.body.overallRating; 
        post.dangerLevel = req.body.dangerLevel;
        post.date = req.body.date;
        post.numberOfVotes = req.body.numberOfVotes;
        post.numberOfComments = req.body.numberOfComments;
        post.isUp = req.body.isUp;
        post.isDown = req.body.isDown; 
        post.comments = req.body.comments;
        post.station_id = req.body.station_id;

        post.save()
        .then( ()=> res.json('Post updated!') )
        .catch( err => res.status(400).json('Error: ' + err)) ;
    })
    .catch( err => res.status(400).json('Error: ' + err) );
})


module.exports = router;

