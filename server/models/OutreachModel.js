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
        required: true
    },
    y: {
        type: String,
        required: true
    },
    zoom: {
        type: Number,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
});

const OutreachModel = mongoose.model("Outreach", Outreach);
module.exports = OutreachModel;

/*
data: Buffer,
contentType: String
*/