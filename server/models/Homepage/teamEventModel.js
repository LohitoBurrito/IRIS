const mongoose = require("mongoose");

const event = new mongoose.Schema({
    eventTitle: {
        type: String,
        required: true
    },
    eventDesc: {
        type: String,
        required: true
    }
});

const TeamEventModel = mongoose.model("event", event);
module.exports = TeamEventModel;
