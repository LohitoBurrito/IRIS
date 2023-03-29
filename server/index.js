require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
const MembersModel = require('./models/MembersModel');
const AboutUsModel = require('./models/Homepage/aboutUsModel');
const DemosModel = require('./models/Homepage/demosModel');
const TeamAtAGlanceModel = require('./models/Homepage/teamAtAGlanceModel');
const TeamEventModel = require('./models/Homepage/teamEventModel');

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})

//Mongoose
mongoose.connect("mongodb+srv://LohitoBurrito:Momuloda2603@cluster0.jmt7gkg.mongodb.net/IRIS?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("db is connected"))
.catch((err) => console.log(err));

//Members Requests
app.get("/api/get/members", async (req, res) => {
    const members = await MembersModel.find({});
    res.send(members);
});
app.post("/api/post/addMember", upload.single('filename'), async (req, res) => {
    console.log(req.body.file);
    var string = req.body.file;
    var bindata = Buffer.from(string.split(",")[1],"base64");
    const member = new MembersModel({
        MemberName: req.body.memberName,
        JobTitle: req.body.role,
        Description: req.body.description,
        Linkedin: req.body.linkedinURL,
        x: req.body.xPos,
        y: req.body.yPos,
        zoom: req.body.Zoom,
        image: {
            data: bindata,
            contentType: "image/png"
        }
    });
    console.log(member);
    try {
        await member.save();
    } catch (err) {
        console.log(err)
    }
});
app.post("/api/post/deleteMember", async (req, res) => {
    await MembersModel.deleteMany({MemberName: req.body.memberName});
    res.send("deleted " + req.body.memberName);
});

//Login post request
app.post("/api/post/login", (req, res) => {
    if (req.body.password === process.env.auth_key) {
        console.log("Correct Paswword");
        const newObject = [{
            "login" : true
        }]
        res.send(true);
    } else {
        console.log("Wrong Password");
        const newObject = [{
            "login" : false
        }]
        res.send(false)
    }
});

//Homepage Request
app.get("/api/get/about", async (req, res) => {
    const aboutUsVal = await AboutUsModel.find({});
    res.send(aboutUsVal);
});
app.get("/api/get/teamGlance", async (req, res) => {
    const teamGlanceVal = await TeamAtAGlanceModel.find({});
    res.send(teamGlanceVal);
});
app.get("/api/get/teamEvents", async (req, res) => {
    const teamEventsVal = await TeamEventModel.find({});
    res.send(teamEventsVal);
});
app.get("/api/get/demos", async (req, res) => {
    const demosVal = await DemosModel.find({});
    res.send(demosVal)
});
app.post("/api/post/about", async (req, res) => {
    await AboutUsModel.deleteMany({});
});
app.post("/api/post/teamGlance", async (req, res) => {

});
app.post("/api/post/addteamEvents", async (req, res) => {
    const newEvent = new TeamEventModel({
        eventTitle: req.body.title,
        eventDesc: req.body.desc
    });
    console.log(newEvent);
    try {
        await newEvent.save();
    } catch (err) {
        console.log(err)
    }
});
app.post("/api/post/addDemos", async (req, res) => {
    const newDemos = new DemosModel({
        demosTitle: req.body.title,
        demosDesc: req.body.desc
    });
    console.log(newDemos);
    try {
        await newDemos.save();
    } catch (err) {
        console.log(err)
    }
});
app.post("/api/post/deleteteamEvents", async (req, res) => {
    await TeamEventModel.deleteMany({eventTitle: req.body.title});
    res.send("Deleted " + req.body.title)
});
app.post("/api/post/deleteDemosOutreach", async (req, res) => {
    await DemosModel.deleteMany({demosDesc: req.body.title});
    res.send("Deleted " + req.body.title);
});

//Sponsor Requests
app.post("/api/post/addSponsor", upload.single('file'), async (req, res) => {

});
app.post("/api/post/deleteSponsor", async (req, res) => {

});

//Contact request
app.get("/api/post/instagram", async (req, res) => {

});
app.get("/api/post/youtube", async (req, res) => {

});
app.get("/api/post/slack", async (req, res) => {

});
app.get("/api/post/twitter", async (req, res) => {

});
app.get("/api/post/gmail", async (req, res) => {

});
app.get("/api/post/facebook", async (req, res) => {

});
app.post("/api/post/instagram", async (req, res) => {

});
app.post("/api/post/youtube", async (req, res) => {

});
app.post("/api/post/slack", async (req, res) => {

});
app.post("/api/post/twitter", async (req, res) => {

});
app.post("/api/post/gmail", async (req, res) => {

});
app.post("/api/post/facebook", async (req, res) => {

});

//Outreach Requests
app.get("/api/get/outreach", async (req, res) => {
    res.send("hey");
})
app.post("/api/post/addOutreach", upload.single('file'), async (req, res) => {

});
app.post("/api/post/deleteOutreach", async (req, res) => {

});

//Join requests
app.get("/api/post/join", async (req, res) => {
    res.send("hey");
});
app.get("/api/post/question", async (req, res) => {
    res.send("hey");
});
app.post("/api/post/addJoin", async (req, res) => {

});
app.post("/api/post/addQuestion", async (req, res) => {

});
app.post("/api/post/deleteQuestion", async (req, res) => {

});

app.listen(4000, () => {
    console.log('PORT 4000 connected');
});

