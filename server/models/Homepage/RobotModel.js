const mongoose = require("mongoose");

const Robot = new mongoose.Schema({
    val: {
        type: String,
        required: true
    },
    Robot: {
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
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
});

const RobotModel = mongoose.model("RobotModel", Robot);
module.exports = RobotModel;

/*
data: Buffer,
contentType: String
*/