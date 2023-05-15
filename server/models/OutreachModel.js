const mongoose = require("mongoose");

const Outreach = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
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
        type: Number,
        required: false
    },
    image: {
        data: Buffer,
        contentType: String,
    }
});

const OutreachModel = mongoose.model("Outreach", Outreach);
module.exports = OutreachModel;

/*
data: Buffer,
contentType: String
*/