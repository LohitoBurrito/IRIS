const mongoose = require("mongoose");

const JoinContent = new mongoose.Schema({
    Content: {
        type: String,
        required: true
    },
});

const JoinContentModel = mongoose.model("JoinContent", JoinContent);
module.exports = JoinContentModel;