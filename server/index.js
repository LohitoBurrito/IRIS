require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
const MembersModel = require('./models/MembersModel');
const CalendarModel = require('./models/CalendarModel');
const ContactModel = require('./models/ContactsModel');
const JoinContentModel = require('./models/Join/JoinContent');
const FAQModel = require('./models/Join/FAQ');
const SponsorModel = require('./models/SponsorModel');
const OutreachModel = require('./models/OutreachModel');
const AboutUsModel = require('./models/Homepage/aboutUsModel');
const DemosModel = require('./models/Homepage/demosModel');
const TeamEventModel = require('./models/Homepage/teamEventModel');
const TeamGlanceModel = require('./models/Homepage/teamGlanceModel');

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.json());
app.use(express.urlencoded ({extended: true}));

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
    console.log(req.body);
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
app.get("/api/get/getOutreach", async (req, res) => {
    res.send(await OutreachModel.find({}))
});

app.post("/api/post/addOutreach", upload.single('filename'), async (req, res) => {
    var string = req.body.filedata;

    if (string === undefined) {
        console.log(req.body)
        const outreach = new OutreachModel({
            Title: req.body.title,
            Description: req.body.desc,
            image: {
                data: "undefined",
                contentType: "image/png"
            }
        })
        try {
            outreach.save();
        } catch (err) {
            console.log(err);
        }
    } else {
        var bindata = Buffer.from(string.split(",")[1],"base64");
        const outreach = new OutreachModel({
            Title: req.body.title,
            Description: req.body.desc,
            Linkedin: req.body.linkedinURL,
            x: req.body.x,
            y: req.body.y,
            zoom: req.body.zoom,
            image: {
                data: bindata,
                contentType: "image/png"
            }
        });
    
        try {
            outreach.save();
        } catch (err) {
            console.log(err);
        }
    }
});

app.delete("/api/delete/deleteOutreach/:id", async (req, res) => {
    await OutreachModel.deleteMany({ "Title" : req.params.id });
});

/*<----------------- Sponsor API request -------------------> */
app.get("/api/get/getSponsors", async (req, res) => {
    res.send(await SponsorModel.find({}));
});

app.post("/api/post/addNewSponsor", upload.single('filename'), (req, res) => {
    console.log(req.body);
    
    var string = req.body.filedata;
    var bindata = Buffer.from(string.split(",")[1],"base64");
    const sponsor = new SponsorModel({
        title: req.body.title,
        sponsorType: req.body.sponsorType,
        filedata: {
            data: bindata,
            contentType: "image/png"
        }
    });

    try {
        sponsor.save();
    } catch (err) {
        console.log(err);
    }  
});

app.delete("/api/delete/deleteSponsor/:id", async (req, res) => {
    await SponsorModel.deleteMany({ "title" : req.params.id });
})

/*<----------------- Homepage API request -------------------> */
app.get("/api/get/aboutUs", async (req, res) => { res.send(await AboutUsModel.find({})) });
app.get("/api/get/demos", async (req, res) => { res.send(await DemosModel.find({})) });
app.get("/api/get/teamEvent", async (req, res) => { res.send(await TeamEventModel.find({})) });
app.get("/api/get/teamGlance", async (req, res) => { res.send(await TeamGlanceModel.find({})) })

app.put("/api/put/editAboutUs", async (req, res) => { 
    await AboutUsModel.updateOne({"val": 0},{ $set: { "aboutUsDesc": req.body.Id, "val": 0 }},{ upsert: true })
});
app.put("/api/post/teamGlance", upload.single('filename'), async (req, res) => {
    const x = await TeamGlanceModel.find({});
    if (x.length === 0) {
        var string = req.body.filedata;
        var bindata = "";
        if (string.length != 0) {
            bindata = Buffer.from(string.split(",")[1],"base64");
        }
        console.log(bindata);
        console.log(req.body)
        const teamGlance = new TeamGlanceModel({
            val: 0,
            Member: req.body.member,
            Mentor: req.body.mentor,
            Years: req.body.years,
            image: {
                data: bindata,
                contentType: "image/png"
            },
            x: req.body.x !== '' ? req.body.x : 0,
            y: req.body.x !== '' ? req.body.x : 0,
            zoom: req.body.zoom !== '' ? req.body.zoom : 100
        });
        try {
            await teamGlance.save();
        } catch (err) {
            console.log(err)
        }
    } else {
        if (req.body.mentor !== '') {
            await TeamGlanceModel.updateOne({"val": 0},{ $set: { "Mentor": req.body.mentor, "val": 0 }},{ upsert: true })
        }
        if (req.body.members !== '') {
            await TeamGlanceModel.updateOne({"val": 0},{ $set: { "Member": req.body.members, "val": 0 }},{ upsert: true })
        }
        if (req.body.years !== '') {
            await TeamGlanceModel.updateOne({"val": 0},{ $set: { "Years": req.body.years, "val": 0 }},{ upsert: true })
        }
        if (req.body.filedata !== '') {
            var string = req.body.filedata;
            console.log(string);
            var bindata = "";
            if (string.length != 0) {
                bindata = Buffer.from(string.split(",")[1],"base64");
            }
            const newData = {
                data: bindata,
                contentType: "image/png"
            }
            await TeamGlanceModel.updateOne({"val": 0},{ $set: { "image": newData, "val": 0 }},{ upsert: true })
        }
        if (req.body.x !== '') {
            await TeamGlanceModel.updateOne({"val": 0},{ $set: { "x": req.body.x, "val": 0 }},{ upsert: true })
        }
        if (req.body.y !== '') {
            await TeamGlanceModel.updateOne({"val": 0},{ $set: { "y": req.body.y, "val": 0 }},{ upsert: true })
        }
        if (req.body.zoom !== '') {
            await TeamGlanceModel.updateOne({"val": 0},{ $set: { "zoom": req.body.zoom, "val": 0 }},{ upsert: true })
        }
    }
})

app.post("/api/post/addTeamEvent", async (req, res) => { 
    console.log(req.body);
    const teamModel = new TeamEventModel({
        eventTitle: req.body.title,
        eventDesc: req.body.desc
    });
    try {
        teamModel.save();
    } catch (err) {
        console.log(err);
    }
});
app.post("/api/post/addDemos", async (req, res) => {  
    console.log(req.body);
    const demoModel = new DemosModel({
        demosTitle: req.body.title,
        demosDesc: req.body.desc
    });
    try {
        demoModel.save();
    } catch (err) {
        console.log(err);
    }
});

app.delete("/api/delete/deleteTeamEvent/:id", async (req, res) => {  
    await TeamEventModel.deleteMany({ "eventTitle" : req.params.id });

});
app.delete("/api/delete/deleteDemos/:id", async (req, res) => {  
    await DemosModel.deleteMany({ "demosTitle" : req.params.id });
});

/*<----------------- Calendar API request ------------------->*/
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

    console.log(await CalendarModel.find({}));
});

/*<----------------- Contact API request -------------------> */
app.get("/api/get/contactData", async (req, res) => {
    res.send(await ContactModel.find({}))
});
app.put("/api/put/gmail", async (req, res) => {
    await ContactModel.updateOne({"val": 0},{ $set: { "Gmail": req.body.link, "val": 0 }},{ upsert: true })
});
app.put("/api/put/facebook", async (req, res) => {
    await ContactModel.updateOne({"val": 0},{ $set: { "Facebook": req.body.link, "val": 0 }},{ upsert: true }) 
});
app.put("/api/put/slack", async (req, res) => {
    await ContactModel.updateOne({"val": 0},{ $set: { "Slack": req.body.link, "val": 0 }},{ upsert: true }) 
});
app.put("/api/put/instagram", async (req, res) => {
    await ContactModel.updateOne({"val": 0},{ $set: { "Instagram": req.body.link, "val": 0 }},{ upsert: true })
});
app.put("/api/put/youtube", async (req, res) => {
    await ContactModel.updateOne({"val": 0},{ $set: { "Youtube": req.body.link, "val": 0 }},{ upsert: true }) 
});
app.put("/api/put/twitter", async (req, res) => {
    await ContactModel.updateOne({"val": 0},{ $set: { "Twitter": req.body.link, "val": 0 }},{ upsert: true }) 
});

/*<----------------- Join API request -------------------> */
app.get("/api/get/getContent", async (req, res) => {
    res.send(await JoinContentModel.find({}));
});
app.get("/api/get/getFAQ", async (req, res) => {
    res.send(await FAQModel.find({}))
});
app.put("/api/put/setContent", async (req, res) => {
    console.log(req.body.content)
    await JoinContentModel.updateOne({"val": 0},{ $set: { "val": 0, "Content": req.body.content }},{ upsert: true }) 
});
app.post("/api/post/addQuestion", async (req, res) => {
    console.log(req.body);
    const question = new FAQModel({
        Question: req.body.question,
        Answer: req.body.answer     
    });
    try {
        await question.save();
    } catch (err) {
        console.log(err)
    }
});
app.delete("/api/post/deleteQuestion/:id", async (req, res) => {
    await FAQModel.deleteMany({ "Question": req.params.id });
    console.log(req.params.id);
});

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

