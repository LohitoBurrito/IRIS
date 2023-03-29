const mongoose = require("mongoose");

const aboutUs = new mongoose.Schema({
    aboutUsDesc: {
        type: String,
        required: true
    }
});

const AboutUsModel = mongoose.model("aboutUs", aboutUs);
module.exports = AboutUsModel;
