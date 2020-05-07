const express = require('express');
const router = express.Router();
const mUser = require('../models/mUser');

//localhost:3000/user/submitUser
router.post('/submitUser', (req, res) => {
    // new document creation
    console.log(req.body)
    let newmUser = new mUser();
    newmUser.name = req.body.name;
    newmUser.age = req.body.age;
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

module.exports = router;
