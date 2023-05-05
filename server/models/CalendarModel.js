const mongoose = require("mongoose");

const Calendar = new mongoose.Schema({
    CalendarLink: {
        type: String,
        required: true
    },
});

const CalendarModel = mongoose.model("Calendar", Calendar);
module.exports = CalendarModel;