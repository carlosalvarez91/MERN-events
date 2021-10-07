const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
    title: String,
    lat: Number,
    lng: Number,
    datetime: Date,
    updated_at: Date
});

const EventModel = mongoose.model('Event', EventSchema);

module.exports = EventModel;
