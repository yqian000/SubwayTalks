const router = require('express').Router();
let Train = require('../models/Train.model');

router.route('/').get((req,res) => {
    Train.find()
    .then( trains => res.json(trains))
    .catch( err => res.status(400).json('Error: ' + err) );
})

router.route('/add').post( (req, res) => {
    const name = req.body.name; 
    const train = req.body.train; 

    const newTrain = new Train({
        name,
        train
    }) ; 
    newTrain.save()
    .then( () => res.json('Train added!'))
    .catch( err => res.status(400).json('Error:' + err));
})


router.route('/:id').get( (req,res) => {
    Train.findById(req.params.id)
    .then( train => res.json(train))
    .catch( err => res.status(400).json('Error: ' + err) )
}); 


router.route('/:id').delete( (req, res) => {
    Train.findByIdAndDelete(req.params.id)
    .then( () => res.json('Train deleted'))
    .catch( err => res.status(400).json('Error: ' + err)) ; 
});

router.route('/update/:id').post( (req,res) => {
    Train.findById(req.params.id)
    .then( train =>{
        train.name = req.body.name; 
        train.station = req.body.station;

        train.save()
        .then( () => res.json('Train update!') )
        .catch( err => res.status(400).json('Error: ' + err) ) ;
    } )
    .catch( err => res.status(400).json( 'Error: ' + err) ) ;
} )


module.exports = router;
