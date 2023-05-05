const mongoose = require("mongoose");

const Contact = new mongoose.Schema({
    val: {
        type: Number,
        required: false
    },
    Gmail: {
        type: String,
        required: false
    },
    Instagram: {
        type: String,
        required: false
    },
    Youtube: {
        type: String,
        required: false
    },
    Facebook: {
        type: String,
        required: false
    },
    Twitter: {
        type: String,
        required: false
    },
    Slack: {
        type: String,
        required: false
    }
});

const ContactModel = mongoose.model("Contact", Contact);
module.exports = ContactModel;