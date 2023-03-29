const mongoose = require("mongoose");

const demos = new mongoose.Schema({
    demosTitle: {
        type: String,
        required: true
    },
    demosDesc: {
        type: String,
        required: true
    }
});

const DemosModel = mongoose.model("demos", demos);
module.exports = DemosModel;