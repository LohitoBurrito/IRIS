const mongoose = require("mongoose");

const Members = new mongoose.Schema({
    MemberName: {
        type: String,
        required: true
    },
    JobTitle: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Linkedin: {
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

const MembersModel = mongoose.model("Members", Members);
module.exports = MembersModel;

/*
data: Buffer,
contentType: String
*/