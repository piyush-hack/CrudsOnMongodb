const nodemailer = require('nodemailer');
const express = require("express");
const app = express();
// const port = 8000;
const port = process.env.PORT;

const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'); const { getMaxListeners } = require('process');
;


mongoose.connect("mongodb+srv://your uri here/test", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

autoIncrement.initialize(db);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    console.log("connected to mongooose");

});
const loginschema = new mongoose.Schema({

    id: String,
    name: String,
    phoneno: String,
    email: String,
    hobbies: String
});

loginschema.methods.speak = function () {//this is used in case you wanna have have method callback
    const greeting = "data feeded of " + this.name
    console.log(greeting);
}

loginschema.plugin(autoIncrement.plugin, { model: 'logindata', field: 'id' });

const logindata = mongoose.model('logindata', loginschema);

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

var id2 = mongoose.Types.ObjectId();;
app.get("/", (req, res) => {

    var id = req.query.id;
    if (req.query.status == 'delete') {
        dbdelete(id);
        // showtable(res);

    }
    showtable(res);
})

app.post("/", (req, res) => {

    console.log(req.body);
    if (req.body.up_id == "") {
        myname = req.body.name;
        myphoneno = req.body.phoneno;
        myemail = req.body.email;
        myhobbies = req.body.hobbies;

        const mydoc = new logindata({
            name: myname,
            phoneno: myphoneno,
            email: myemail,
            hobbies: myhobbies
        });

        // Inserts a new document with `name = 'Will Riker'` and
        // `rank = 'Commander'`
        mydoc.save();
        res.status(200).render('indexpost');

    } else if (req.body.up_id) {
        myid = req.body.up_id;
        myname = req.body.name;
        myphoneno = req.body.phoneno;
        myemail = req.body.email;
        myhobbies = req.body.hobbies;
        console.log("enetred")
        logindata.updateOne({ id: `${myid}` }, {
            $set: {
                name: `${myname}`,
                phoneno: `${myphoneno}`,
                email: `${myemail}`,
                hobbies: `${myhobbies}`
            }
        }, function (err, docs) {
            if (err) console.log(err);

        });
    }
    res.status(200).render('indexpost');

})


app.post("/:sendmail", (req, res) => {
    console.log('mail send:  ', req.body);
    res.status(200).render('indexpost');
    var maildata = req.body.maildata;
    console.log(typeof (maildata), maildata);
    sendmail(maildata);
});

function showtable(res) {
    logindata.find({}, function (err, docs) {
        if (err) console.log(err);
        var data = JSON.stringify(docs);
        // console.log(docs)
        var params = { "data": data };
        res.status(200).render('index', params);

    }).select('-_id -__v');
}

function dbdelete(strid) {
    console.log("methods called", strid);
    var myid = parseInt(strid);
    // console.log(myid);
    logindata.deleteOne({ id: `${strid}` }, function (err) {
        if (err) return console.log(err);

    });
}


function sendmail(mytext) {
    var string = "G-Mail Sent";
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'piyushpuniya2001@gmail.com',
            pass: 'frvgerygbdwgdprk'
        }
    });
    console.log("sending---");
    const message = {
        from: 'piyushpuniya2001@gamil.com',
        // to: `info@redpositive.in`,
        to: 'info@redpositive.in',
        subject: 'Sending Email using Node.js',
        text: `${mytext}`,
        // attachments: [
        //     { // Use a URL as an attachment
        //         filename: 'your-attachment.png',
        //         path: 'https://media.gettyimages.com/photos/view-of-tesla-model-s-in-barcelona-spain-on-september-10-2018-picture-id1032050330?s=2048x2048'
        //     }
        // ]

    };
    console.log("sending---");
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
            string = "Some err occured plz try after some time";
        }
        console.log("mail infi", info);
        string = "Email Sent! Check Now.";

    });
    return string;
}

app.listen(port, () => {
    console.log(`connection started at port http://127.0.0.1:${port}/`)
});
