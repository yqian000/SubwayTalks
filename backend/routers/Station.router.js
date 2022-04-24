const router = require('express').Router(); 
let Station = require('../models/Station.model');


router.route('/').get( (req,res) => {
    Station.find()
    .then( stations => res.json(stations))
    .catch( err => res.status(400).json('Error: ' + err));
} );


router.route( '/get/:id').get( (req,res) =>{
    Station.findById( req.params.id)
    .then( station => res.json(station) )
    .catch( err => res.status(400).json('Error: ' + err)) ; 
} ) ; 



router.route('/').get( (req,res) => {
    Station.find()
    .then( stations => res.json(stations))
    .catch( err => res.status(400).json('Error: ' + err));
} );


router.route( '/get/:id').get( (req,res) =>{
    Station.findById( req.params.id)
    .then( station => res.json(station) )
    .catch( err => res.status(400).json('Error: ' + err)) ; 
} ) ; 


router.route('/delete/:id').delete( (req,res)=>{
    Station.findByIdAndDelete(req.params.id)
    .then( ()=> res.json('Station deleted') )
    .catch( err => res.status(400).json('Error: ' + err));
} )


router.route( '/update/:id').post( (req,res)=>{
    Station.findById(req.params.id)
    .then( station => {
        station.name = req.body.name; 
        station.url = req.body.url; 
        station.trains = req.body.trains;

        station.save()
        .then( ()=> res.json('Station updated!'))
        .catch( err => res.status(400).json('Error: ' + err)) ;
    })
    .catch( err => res.status(400).json( 'Error: ' + err) );
} )


module.exports = router;

