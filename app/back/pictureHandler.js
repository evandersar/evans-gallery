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
        Picture.find((err, pics)=>{
            if (err) res.status(500).send(err);
            
            res.json(pics);
        });
    };
    
    this.getMyPictures = function(req, res) {
        var facebookId = req.body.userId;
        
        Picture.find({ author: facebookId }, (err, mypics)=>{
            if (err) res.status(500).send(err);
            
            res.json(mypics);
        });
    };

    this.updatePicture = function(req, res) {

        var venueID = req.params.id;
        var voter = req.body.voter;

        Picture.findOne({ venue_id: venueID }, function(err, venue) {
            if (err) throw err;
            console.log("venue => ", venue);

            if (!venue) {
                return res.json({ errMsg: `No venue with id: ${venueID} in Database. Search one more time and try again` });
            }
            else {
                if (venue.visitors.indexOf(voter) === -1) {
                    Picture.findOneAndUpdate({ venue_id: venueID }, { $inc: { going: 1 }, $push: { visitors: voter } }, { new: true },
                        function(err, doc) {
                            if (err) throw err;
                            console.log("doc => ", doc);
                            res.json(doc);
                        }
                    );
                }
                else {
                    Picture.findOneAndUpdate({ venue_id: venueID }, { $inc: { going: -1 }, $pull: { visitors: voter } }, { new: true },
                        function(err, doc) {
                            if (err) throw err;
                            console.log("doc => ", doc);
                            res.json(doc);
                        }
                    );
                }
            }

        });


    };
}

module.exports = PictureHandler;
