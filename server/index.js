require('dotenv').config({ path: '/.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
const MembersModel = require('./models/MembersModel');

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
mongoose.connect(process.env.Mongo_URI, {
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
app.post("/api/post/deleteMember", (req, res) => {

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

//Sponsor Requests
app.post("/api/post/addSponsor", upload.single('file'), (req, res) => {

});
app.post("/api/post/deleteSponsor", (req, res) => {

})

//Homepage Request
app.get("/api/get/about", (req, res) => {

});
app.get("/api/get/teamGlance", (req, res) => {

});
app.get("/api/get/teamEvents", (req, res) => {

});
app.get("/api/get/demos", (req, res) => {

});
app.post("/api/post/about", (req, res) => {

});
app.post("/api/post/teamGlance", (req, res) => {

});
app.post("/api/post/addteamEvents", (req, res) => {

});
app.post("/api/post/addDemos", (req, res) => {

});
app.post("/api/post/deleteteamEvents", (req, res) => {

});
app.post("/api/post/deleteDemosOutreach", (req, res) => {

});

//Contact request
app.get("/api/post/instagram", (req, res) => {

});
app.get("/api/post/youtube", (req, res) => {

});
app.get("/api/post/slack", (req, res) => {

});
app.get("/api/post/twitter", (req, res) => {

});
app.get("/api/post/gmail", (req, res) => {

});
app.get("/api/post/facebook", (req, res) => {

});
app.post("/api/post/instagram", (req, res) => {

});
app.post("/api/post/youtube", (req, res) => {

});
app.post("/api/post/slack", (req, res) => {

});
app.post("/api/post/twitter", (req, res) => {

});
app.post("/api/post/gmail", (req, res) => {

});
app.post("/api/post/facebook", (req, res) => {

});

//Outreach Requests
app.get("/api/get/outreach", (req, res) => {
    res.send("hey");
})
app.post("/api/post/addOutreach", upload.single('file'), (req, res) => {

});
app.post("/api/post/deleteOutreach", (req, res) => {

});

//Join requests
app.get("/api/post/join", (req, res) => {
    res.send("hey");
});
app.get("/api/post/question", (req, res) => {
    res.send("hey");
});
app.post("/api/post/addJoin", (req, res) => {

});
app.post("/api/post/addQuestion", (req, res) => {

});
app.post("/api/post/deleteQuestion", (req, res) => {

});

app.listen(4000, () => {
    console.log('PORT 4000 connected');
});

