const mongoose = require("mongoose");

const Award = new mongoose.Schema({
    Award: {
        type: String,
        required: true
    },
});

const AwardModel = mongoose.model("AwardModel", Award);
module.exports = AwardModel;

/*
data: Buffer,
contentType: String
*/