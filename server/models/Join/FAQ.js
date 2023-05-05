const mongoose = require("mongoose");

const FAQ = new mongoose.Schema({
    Question: {
        type: String,
        required: true
    },
    Answer: {
        type: String,
        required: true
    }
});

const FAQModel = mongoose.model("FAQ", FAQ);
module.exports = FAQModel;