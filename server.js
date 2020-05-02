const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const mUser = require('./models/mUser');

// db connection
mongoose.connect("mongodb://localhost:27017/rajaDB", { useNewUrlParser: true, useUnifiedTopology: true }, (err, succ) => {
    if (err) {
        // connection failed
        console.log("db not connected");
    } else {
        // connection success
        console.log("DB connected");
    }
});

// same localhost, different ports
app.use(cors());

// parsing req data
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server started at 3000");
});

app.post('/submitUser', (req, res) => {
    // new document creation
    let newmUser = new mUser();
    newmUser.name = req.body.userName;
    newmUser.age = req.body.userAge;
    newmUser.save((saveErr, saveDocs) => {
        if (saveErr) {
            console.log("err at saving docs to db");
            res.json({ "docs": "err" })
        } else {
            console.log("doc saved succ");
            console.log(saveDocs);
            res.json({ "docs": saveDocs })
        }
    });
});

app.get('getAllUserDocs', (req, res) => {
    mUser.find({}, {}, {}, (userErr, userDocs) => {
        if (err) {
            console.log("err while fetching docs");
            res.json({ "docs": "null" });
        } else {
            res.json({ "docs": userDocs });
        }
    });
});