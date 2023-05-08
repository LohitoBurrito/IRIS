const mongoose = require("mongoose");

const TeamGlance = new mongoose.Schema({
    val: {
        type: String,
        required: false
    },
    Member: {
        type: String,
        required: false
    },
    Mentor: {
        type: String,
        required: false
    },
    Years: {
        type: String,
        required: false
    },
    x: {
        type: String,
        required: false
    },
    y: {
        type: String,
        required: false
    },
    zoom: {
        type: String,
        required: false
    },
    image: {
        data: Buffer,
        contentType: String
    }
});

const TeamGlanceModel = mongoose.model("TeamGlance", TeamGlance);
module.exports = TeamGlanceModel;

/*
data: Buffer,
contentType: String
*/