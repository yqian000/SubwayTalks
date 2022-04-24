const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const stationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        trains: {
            type: Array,
            required: true,
        }
    }
);

const Station = mongoose.model( 'Station', stationSchema);

module.exports = Station;