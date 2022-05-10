const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const postSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
        },
        trainName:{
            type: String,
            required: true,
        },
        stationName:{
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true, 
        },
        body: {
            type: String,
            required: true,
        }, 
        overallRating:{
            type: String,
            required: true
        },
        dangerLevel: {
            type: String, 
            required: true
        },
        date: {
        type: String,
        default: (new Date()).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}) 
         }, 
         numberOfVotes:{
             type: Number,
             required: true
         },
         numberOfComments:{
             type: Number,
             required: true,
         },
        isUp:{
            type: Boolean,
            required: true, 
        },
        isDown: {
            type: Boolean,
            required: true,
        },
        comments: [{
            body: String,
            date: Date
        }],
        station_id: {
            type: String, 
            required: true,
        }
        
    }
    );

const Post = mongoose.model( 'Post', postSchema);
module.exports = Post;



