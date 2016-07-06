var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/vidzy');

router.get('/', function (req, res) {
    var collection = db.get('genres');
    collection.find({}, function (err, genres) {
        if (err) throw err;
        res.json(genres);
    });
});

module.exports = router;