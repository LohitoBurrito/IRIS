const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})

app.get("/api/get/login", (req, res) => {
    fs.readFile('../client/src/data/loggedIn.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err);
        } else {
            try {
                data = JSON.parse(jsonString);
            } catch(err) {
                console.log(err);
            }
        }
        res.send(data);
    })
});

app.post("/api/post/login", (req, res) => {
    if (req.body.password === process.env.auth_key) {
        console.log("Correct Paswword");
        const newObject = [{
            "login" : true
        }]
        fs.writeFile('../client/src/data/loggedIn.json', JSON.stringify(newObject, null, 2), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File Successfully written!');
            }
        });
    } else {
        console.log("Wrong Password");
        const newObject = [{
            "login" : false
        }]
        fs.writeFile('../client/src/data/loggedIn.json', JSON.stringify(newObject, null, 2), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File Successfully written!');
            }
        });
    }
});

app.post("/api/post/logout", (req, res) => {
    console.log("Wrong Password");
    const newObject = [{
        "login" : false
    }]
    fs.writeFile('../client/src/data/loggedIn.json', JSON.stringify(newObject, null, 2), err => {
        if (err) {
            console.log(err)
        } else {
            console.log('File Successfully written!');
        }
    });
});

app.post("/api/post/addSponsor", upload.single('file'), (req, res) => {
   console.log(req.body.fileName);
   console.log(req.body.title);
   console.log(req.body.sponsorType);
   var data = "";
   fs.readFile('../client/src/data/sponsor.json', 'utf-8', (err, jsonString) => {
    if (err) {
        console.log(err);
    } else {
        try {
            data = JSON.parse(jsonString);
        } catch(err) {
            console.log(err);
        }
    }
    const newObject = [
        {
            "title": req.body.title,
            "filename": req.body.fileName,
            "sponsorType": req.body.sponsorType
        }
    ]
    const newObject2 = newObject.concat(data);
    console.log(newObject2);
    fs.writeFile('../client/src/data/sponsor.json', JSON.stringify(newObject2, null, 2), err => {
        if (err) {
            console.log(err)
        } else {
            console.log('File Successfully written!');
        }
    });
});
});

app.post("/api/post/deleteSponsor", (req, res) => {
    console.log(req.body.title);
    var data = "";
    fs.readFile('../client/src/data/sponsor.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err);
        } else {
            try {
                data = JSON.parse(jsonString);
            } catch(err) {
                console.log(err);
            }
        }
        const newData = data.filter(obj => {return obj.title != req.body.title});
        fs.writeFile('../client/src/data/sponsor.json', JSON.stringify(newData, null, 2), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File Successfully written!');
            }
        });
    })
})

app.post("/api/post/about", (req, res) => {
    console.log(req.body.Id);
    const newObject = [{
        desc: req.body.Id
    }]
    fs.writeFile('../client/src/data/aboutUs.json', JSON.stringify(newObject, null, 2), err => {
        if (err) {
            console.log(err)
        } else {
            console.log('File Successfully written!');
        }
    });
});
app.post("/api/post/teamGlance", (req, res) => {
    console.log(req.body.Id);
    const newObject = [{
        desc: req.body.Id
    }]
    fs.writeFile('../client/src/data/ourTeamAtAGlance.json', JSON.stringify(newObject, null, 2), err => {
        if (err) {
            console.log(err)
        } else {
            console.log('File Successfully written!');
        }
    });
});
app.post("/api/post/addteamEvents", (req, res) => {
    var data = "";
    fs.readFile('../client/src/data/teamEvents.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err);
        } else {
            try {
                data = JSON.parse(jsonString);
            } catch(err) {
                console.log(err);
            }
        }
        const newObject = [
            {
                "title": req.body.title,
                "desc": req.body.desc
            }
        ]
        const newObject2 = newObject.concat(data);
        console.log(newObject2);
        fs.writeFile('../client/src/data/teamEvents.json', JSON.stringify(newObject2, null, 2), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File Successfully written!');
            }
        });
    });
});
app.post("/api/post/addDemos", (req, res) => {
    var data = "";
    fs.readFile('../client/src/data/demos.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err);
        } else {
            try {
                data = JSON.parse(jsonString);
            } catch(err) {
                console.log(err);
            }
        }
        const newObject = [
            {
                "title": req.body.title,
                "desc": req.body.desc
            }
        ]
        const newObject2 = newObject.concat(data);
        console.log(newObject2);
        fs.writeFile('../client/src/data/demos.json', JSON.stringify(newObject2, null, 2), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File Successfully written!');
            }
        });
    });
});
app.post("/api/post/deleteteamEvents", (req, res) => {
    var data = "";
    fs.readFile('../client/src/data/teamEvents.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err);
        } else {
            try {
                data = JSON.parse(jsonString);
            } catch(err) {
                console.log(err);
            }
        }
        const newData = data.filter(obj => {return obj.title != req.body.title});
        fs.writeFile('../client/src/data/teamEvents.json', JSON.stringify(newData, null, 2), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File Successfully written!');
            }
        });
    });
});

app.post("/api/post/deleteDemosOutreach", (req, res) => {
    var data = "";
    fs.readFile('../client/src/data/demos.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err);
        } else {
            try {
                data = JSON.parse(jsonString);
            } catch(err) {
                console.log(err);
            }
        }
        const newData = data.filter(obj => {return obj.title != req.body.title});
        fs.writeFile('../client/src/data/demos.json', JSON.stringify(newData, null, 2), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File Successfully written!');
            }
        });
    });
});

app.post("/api/post/instagram", (req, res) => {
    console.log(req.body.link);
    const newData = [{
        "link" : req.body.link
    }]
    fs.writeFile('../client/src/data/contact/instagram.json', JSON.stringify(newData, null, 2), err => {
        if (err) {
            console.log(err)
        } else {
            console.log('File Successfully written!');
        }
    });
});
app.post("/api/post/youtube", (req, res) => {
    const newData = [{
        "link" : req.body.link
    }]
    fs.writeFile('../client/src/data/contact/youtube.json', JSON.stringify(newData, null, 2), err => {
        if (err) {
            console.log(err)
        } else {
            console.log('File Successfully written!');
        }
    });
});
app.post("/api/post/slack", (req, res) => {
    const newData = [{
        "link" : req.body.link
    }]
    fs.writeFile('../client/src/data/contact/slack.json', JSON.stringify(newData, null, 2), err => {
        if (err) {
            console.log(err)
        } else {
            console.log('File Successfully written!');
        }
    });
});
app.post("/api/post/twitter", (req, res) => {
    const newData = [{
        "link" : req.body.link
    }]
    fs.writeFile('../client/src/data/contact/twitter.json', JSON.stringify(newData, null, 2), err => {
        if (err) {
            console.log(err)
        } else {
            console.log('File Successfully written!');
        }
    });
});
app.post("/api/post/gmail", (req, res) => {
    const newData = [{
        "link" : req.body.link
    }]
    fs.writeFile('../client/src/data/contact/gmail.json', JSON.stringify(newData, null, 2), err => {
        if (err) {
            console.log(err)
        } else {
            console.log('File Successfully written!');
        }
    });
});
app.post("/api/post/facebook", (req, res) => {
    const newData = [{
        "link" : req.body.link
    }]
    fs.writeFile('../client/src/data/contact/facebook.json', JSON.stringify(newData, null, 2), err => {
        if (err) {
            console.log(err)
        } else {
            console.log('File Successfully written!');
        }
    });
});
app.post("/api/post/addMember", upload.single('file'), (req, res) => {
    var data = "";
    fs.readFile('../client/src/data/members.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err);
        } else {
            try {
                data = JSON.parse(jsonString);
            } catch(err) {
                console.log(err);
            }
        }
        const newObject = [
            {
                "memberName": req.body.memberName,
                "role": req.body.role,
                "linkedin": req.body.linkedinURL,
                "desc": req.body.description,
                "x": req.body.xPos,
                "y": req.body.yPos,
                "zoom": req.body.Zoom,
                "fileData": req.body.filename
            }
        ]
        const newObject2 = newObject.concat(data);
        console.log(newObject2);
        fs.writeFile('../client/src/data/members.json', JSON.stringify(newObject2, null, 2), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File Successfully written!');
            }
        });
    });
});
app.post("/api/post/deleteMember", (req, res) => {
    var data = "";
    console.log(req.body.memberName);
    fs.readFile('../client/src/data/members.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err);
        } else {
            try {
                data = JSON.parse(jsonString);
            } catch(err) {
                console.log(err);
            }
        }
        const newData = data.filter(obj => {return obj.memberName != req.body.memberName});
        fs.writeFile('../client/src/data/members.json', JSON.stringify(newData, null, 2), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File Successfully written!');
            }
        });
    });  
});

app.post("/api/post/addOutreach", upload.single('file'), (req, res) => {
    var data = "";
    fs.readFile('../client/src/data/outreach.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err);
        } else {
            try {
                data = JSON.parse(jsonString);
            } catch(err) {
                console.log(err);
            }
        }
        const newObject = [
            {
                "title": req.body.title,
                "desc": req.body.desc,
                "x": req.body.x,
                "y": req.body.y,
                "zoom": req.body.zoom,
                "width": req.body.width,
                "fileData": req.body.filename
            }
        ]
        const newObject2 = newObject.concat(data);
        console.log(newObject2);
        fs.writeFile('../client/src/data/outreach.json', JSON.stringify(newObject2, null, 2), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File Successfully written!');
            }
        });
    });
});
app.post("/api/post/deleteOutreach", (req, res) => {
    console.log(req.body.outreachTitle);
    var data = "";
    fs.readFile('../client/src/data/outreach.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err);
        } else {
            try {
                data = JSON.parse(jsonString);
            } catch(err) {
                console.log(err);
            }
        }
        const newData = data.filter(obj => {return obj.title != req.body.outreachTitle});
        fs.writeFile('../client/src/data/outreach.json', JSON.stringify(newData, null, 2), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File Successfully written!');
            }
        });
    });  
});

app.post("/api/post/addJoin", (req, res) => {
    console.log(req.body.content);    
    const newData = [{
        "content" : req.body.content
    }]
    fs.writeFile('../client/src/data/join/joinContent.json', JSON.stringify(newData, null, 2), err => {
        if (err) {
            console.log(err)
        } else {
            console.log('File Successfully written!');
        }
    });
});

app.post("/api/post/addQuestion", (req, res) => {
    var data = "";
    fs.readFile('../client/src/data/join/questions.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err);
        } else {
            try {
                data = JSON.parse(jsonString);
            } catch(err) {
                console.log(err);
            }
        }
        const newData = [{
            "question" : req.body.question
        }]
        const newData2 = newData.concat(data);
        fs.writeFile('../client/src/data/join/questions.json', JSON.stringify(newData2, null, 2), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File Successfully written!');
            }
        });
    });
});

app.post("/api/post/deleteQuestion", (req, res) => {
    var data = "";
    fs.readFile('../client/src/data/join/questions.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err);
        } else {
            try {
                data = JSON.parse(jsonString);
            } catch(err) {
                console.log(err);
            }
        }
        const newData = data.filter(obj => {return obj.question != req.body.question});
        fs.writeFile('../client/src/data/join/questions.json', JSON.stringify(newData, null, 2), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File Successfully written!');
            }
        });
    });
});

app.listen(4000, () => {
    console.log('PORT 4000 connected');
});

