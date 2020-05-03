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

// getting all user docs
app.get('/getAllUserDocs', (req, res) => {
    /**
     * 1st {} = match query
     * 2nd {} = projection
     * 3rd {} utility
     */
    mUser.find({}, {}, { lean: true }, (userErr, userDocs) => {
        if (userErr) {
            console.log("err while fetching docs");
            res.json({ "docs": "null" });
        } else {
            res.json({ "docs": userDocs });
        }
    });
});

app.post('/editUser', (req, res) => {
    mUser.findById({ _id: req.body._id }, {}, {}, (err, docs) => {
        if (err) {
            res.json({ "update": null });

        } else {
            docs.name = req.body.newname;
            docs.save((updateErr, updateDocs) => {
                if (updateErr) {
                    res.json({ "update": null });
                } else {
                    res.json({ "update": "succ" });
                }
            });
        }
    });
});