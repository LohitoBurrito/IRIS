const mongoose = require("mongoose");

const Sponsor = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sponsorType: {
        type: String,
        required: true
    },
    filedata: {
        data: Buffer,
        contentType: String
    }
});

const SponsorModel = mongoose.model("Sponsor", Sponsor);
module.exports = SponsorModel;

/*
data: Buffer,
contentType: String
*/