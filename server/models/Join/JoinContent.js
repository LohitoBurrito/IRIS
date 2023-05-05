const mongoose = require("mongoose");

const JoinContent = new mongoose.Schema({
    val: {
        type: Number,
        require: true
    },
    Content: {
        type: String,
        required: true
    },
});

const JoinContentModel = mongoose.model("JoinContent", JoinContent);
module.exports = JoinContentModel;