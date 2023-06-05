const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const entrySchema = new mongoose.Schema({
  title: String, 
  content: String
});
const Entry = mongoose.model("Entry", entrySchema);
const app = express();
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });
app.use(bodyParser.json());
app.get('/entries', function(req, res) {
    Entry.find({}, function(err, results) {
        if (!err)
            res.send(results);
        else 
            console.log('Error while fetching entries.');
    })
});
app.post('/entry', function(req, res) {
    const entry = req.body;
    let record = new Entry(entry);
    record.save().then(() => {
      res.status(201).end();
    }, err => {
      console.error(`Failed to save entry ${record}: ` + err);
      res.status(500).end();
    });
});
app.listen(3000, () => console.log('Example app listening on port 3000!'));