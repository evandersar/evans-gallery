'use strict';

var Picture = require('./models/picture');

function PictureHandler() {

    this.addPicture = function(req, res) {
        console.log("req.body => ", req.body);

        var newPic = new Picture(req.body);

        newPic["likes"] = 0;
        newPic["voters"] = [];

        newPic.save((err, pic) => {
            if (err) res.status(500).send(err);

            console.log("Saved pic: ", pic);
            res.json(pic);
        });
    };

    this.getPictures = function(req, res) {
        Picture.find((err, pics) => {
            if (err) res.status(500).send(err);

            res.json(pics);
        });
    };

    this.getMyPictures = function(req, res) {
        var facebookId = req.body.userId;

        Picture.find({ author: facebookId }, (err, mypics) => {
            if (err) res.status(500).send(err);

            res.json(mypics);
        });
    };

    this.updatePicture = function(req, res) {

        var picID = req.params.id;
        var voter = req.body.voter;

        Picture.findById(picID, function(err, pic) {
            if (err) res.status(500).send(err);
            console.log("pic => ", pic);

            if (pic.voters.indexOf(voter) === -1) {
                Picture.findByIdAndUpdate(picID, { $inc: { likes: 1 }, $push: { voters: voter } }, { new: true },
                    function(err, doc) {
                        if (err) res.status(500).send(err);
                        console.log("doc => ", doc);
                        res.json(doc);
                    }
                );
            }
            else {
                Picture.findByIdAndUpdate(picID, { $inc: { likes: -1 }, $pull: { voters: voter } }, { new: true },
                    function(err, doc) {
                        if (err) res.status(500).send(err);
                        console.log("doc => ", doc);
                        res.json(doc);
                    }
                );
            }


        });


    };
}

module.exports = PictureHandler;
