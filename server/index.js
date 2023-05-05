require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
const MembersModel = require('./models/MembersModel');
const CalendarModel = require('./models/CalendarModel');
const ContactModel = require('./models/ContactsModel')
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

/*<----------------- Multer & MongoDB Connection -------------------> */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})

mongoose.connect("mongodb+srv://LohitoBurrito:Momuloda2603@cluster0.jmt7gkg.mongodb.net/IRIS?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("db is connected"))
.catch((err) => console.log(err));

/*<----------------- Members API request -------------------> */
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

/*<----------------- Outreach API request -------------------> */

/*<----------------- Sponsor API request -------------------> */

/*<----------------- Homepage API request -------------------> */

/*<----------------- Calendar API request -------------------> */
app.get("/api/get/getCalendar", async (req, res) => {
    res.send(await CalendarModel.find({}))
});
app.post("/api/post/setCalendar", async (req,res) => {
    var x = req.body.val;
    x = x.replace("r?cid", "embed?src");
    console.log(x);

    await CalendarModel.deleteMany({});

    const calendar = new CalendarModel({
        CalendarLink: x
    });

    try {
        await calendar.save();
    } catch (err) {
        console.log(err);
    }

    console.log(await CalendarModel.find({}))
});


/*<----------------- Contact API request -------------------> */
app.get("/api/get/contactData", async (req, res) => {
    res.send(await ContactModel.find({}))
});
app.post("/api/post/gmail", async (req, res) => {
    await ContactModel.updateOne({"val": 0},{ $set: { "Gmail": req.body.link, "val": 0 }},{ upsert: true })
});
app.post("/api/post/facebook", async (req, res) => {
    await ContactModel.updateOne({"val": 0},{ $set: { "Facebook": req.body.link, "val": 0 }},{ upsert: true }) 
});
app.post("/api/post/slack", async (req, res) => {
    await ContactModel.updateOne({"val": 0},{ $set: { "Slack": req.body.link, "val": 0 }},{ upsert: true }) 
});
app.post("/api/post/instagram", async (req, res) => {
    await ContactModel.updateOne({"val": 0},{ $set: { "Instagram": req.body.link, "val": 0 }},{ upsert: true })
});
app.post("/api/post/youtube", async (req, res) => {
    await ContactModel.updateOne({"val": 0},{ $set: { "Youtube": req.body.link, "val": 0 }},{ upsert: true }) 
});
app.post("/api/post/twitter", async (req, res) => {
    await ContactModel.updateOne({"val": 0},{ $set: { "Twitter": req.body.link, "val": 0 }},{ upsert: true }) 
});

/*<----------------- Join API request -------------------> */

/*<----------------- Login API request -------------------> */
app.post("/api/post/login", (req, res) => {
    if (req.body.password === process.env.auth_key) {
        console.log("Correct Password");
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

app.listen(4000, () => {
    console.log('PORT 4000 connected');
});

