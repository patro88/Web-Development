var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

var mongoose = require('mongoose');

var cors = require('cors');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));

/* enable CORS*/
app.use(cors());

var mongoDBString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/cs5610';
mongoose.connect(mongoDBString);

var books = [
    {
        name: "Book1",
        isbn: "AS2345",
        price: "$200"
    },
    {
        name: "Book2",
        isbn: "PK2345",
        price: "$130"
    },
    {
        name: "Book3",
        isbn: "SN2345",
        price: "$400"
    },
    {
        name: "Book4",
        isbn: "RT2345",
        price: "$20"
    }
];

app.get('/hello', function (req, res) {
    res.send("Hello From ExpressJS.");
});


app.get('/api/book', function (req, res) {
    res.json(books);
});



app.get('/api/book/:id', function (req, res) {
    res.json(books[req.params.id]);
});



app.delete("/api/book/:id", function (req, res) {
    books.splice(req.params.id, 1);
    res.json(books);
})

app.put("/api/book/:id", function (req, res) {
    books[req.params.id] = req.body;
    res.json(books);
})

app.post("/api/book", function (req, res) {
    books.push(req.body);
    res.json(books);
})

//app.get("/process", function (req, res) {
//    res.json(mongoDBString);
//})

/* Book Model Creation - Mongo DB */

var PlayerSchema = mongoose.Schema({
    name: String,
    team: String,
    runs: Number,
    wickets: Number,
}, { collection: 'player' });

var PlayerModel = mongoose.model('PlayerModel', PlayerSchema);

//var player1 = new PlayerModel({
//    name: "Sehwag",
//    team: "India",
//    runs: 1345,
//    wickets: 2,
//});
//player1.save();

app.get("/api/player", function (req, res) {
    PlayerModel.find(function (err, data) {
        res.json(data);
    });
})

//get a single player
app.get("/api/player/1", function (req, res) {
    PlayerModel.find(function (err, data) {
        res.json(data[0]);
    });
})


app.post("/api/player", function (req, res) {

    var player1 = new PlayerModel(req.body)
    player1.save(function (err, doc) {
        PlayerModel.find(function (err, data) {
            res.json(data);
        });
    });

})

app.delete("/api/player/:id", function (req, res) {
    PlayerModel.findById(req.params.id, function (err, doc) {
        doc.remove();
        PlayerModel.find(function (err, data) {
            res.json(data);
        });
    });
})

app.put("/api/player/:id", function (req, res) {
    var upsertData = req.body;
    delete upsertData._id;
    PlayerModel.update({ _id: req.params.id }, upsertData, { multi: false }, function (err) {
        if (err) {
            throw err;
        } else {
            PlayerModel.find(function (err, data) {
                res.json(data);
            });
        }
        
    });
})


var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ip);