const db = require('../models');
const User = require('../models/user');
const moment = require("moment");



module.exports = {
    findAll: function(req, res){
        db
        .User
        .find(req.query)
        .sort({date: 1})
        .then(dbModel => res.json(dbModel))
        .catch(err => {
            console.log(err);
            res.status(422).json(err)
        });
    },

    findById: function(req, res){
        db
        .User
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => {
            console.log(err);
            res.status(422).json(err)
        });    
    },
    create: function(req, res){
        db
        .User
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => {
            console.log(err);
            res.status(422).json(err)
        });
    },

    update: function(req, res){
        db
        .User
        .findOneAndUpdate({
            _id: req.params.id
        }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => {
            console.log(err);
            res.status(422).json(err)
        });    
    },

    remove: function(req, res){
        db
        .User
        .findById({_id: req.params.id})
        .then(dbModel => dbModel.remove())
        .catch(err => {
            console.log(err);
            res.status(422).json(err)
        });    
    },

    register: function(req, res){
        console.log(req.body);
        User
        .register(new User({username: req.body.username}), req.body.password, function(err){
            if(err){
                console.log('error while user register!', err);

                return res.status(422).json(err);
            }

            console.log('user registered')
            res.json(true);
        });
    },

    getTimeSheet: function(req,res) {
        console.log(req.user)
        if (req.user) {
            User.findById(req.user._id)
                .then(function(userInfo) {
                    res.json(userInfo);
                }).catch(function(err) {
                    console.log(err);
                    res.json(err);
                })
        } else {
            res.json({loggedIn: false});
        }
    },

    setStartTime: function(req, res) {
        console.log(req.body)
        // req.body should be {startTime: moment().format("hh:mm:ss"), date: moment.format("ddd MMM D")}
        console.log(req.user);
        if (req.user) {
            User.updateOne({
                _id: req.user._id,
            }, {
                $push: {
                    timecards: req.body
                }
            }).then(userInfo => {
                console.log(userInfo)
                res.json(userInfo)
            }).catch(err => {
                console.log(err);
                res.status(422).json(err);
            })
        } else {
            res.json({loggedIn: false})
        }
    },

    setEndTime: function(req, res) {
        console.log(req.user);
        // req.body should be {endTime: moment().format("hh:mm:ss"), date: moment.format("ddd MMM D")}

        if (req.user) {
            User.updateOne({
                "_id": req.user._id,
                "timecards.date": req.body.date
            }, {
                $set: {
                    "timecards.$.endTime": req.body.endTime
                }
            }).then(userInfo => {
                console.log(userInfo);
                res.json(userInfo);
            }).catch(err => {
                console.log(err);
                res.status(422).json(err);
            })
        } else {
            res.json({loggedIn: false})
        }
    }

};