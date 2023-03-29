const mongoose = require("mongoose");

const teamAtAGlance = new mongoose.Schema({
    teamGlanceDesc: {
        type: String,
        required: true
    }
});

const TeamAtAGlanceModel = mongoose.model("teamAtAGlance", teamAtAGlance);
module.exports = TeamAtAGlanceModel;