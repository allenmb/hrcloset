const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/heritage', {
    useNewUrlParser: true
});

// Create a scheme for a building and its items
const bldgSchema = new mongoose.Schema({
    building: Number,
    items: [{
        name: String,
        current_number: Number,
        stocked_number: Number,
    }],
});

// Create a model for a building and its items
const Bldg = mongoose.model('Bldg', bldgSchema);

// Add a new building
app.post('/api/bldgs', async (req, res) => {
    const bldg = new Bldg({
        building: req.body.building,
        items: [],
    });
    try {
        await bldg.save();
        res.send(bldg);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete a building
app.delete('/api/bldgs/:id', async (req, res) => {
    try {
        await Bldg.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Remove a kind of item. This will only be used to remove an entire item from the list, NOT to change the number of items in a closet
app.put('/api/bldgs/remove/:id', async (req, res) => {
    try {
        let building = await Bldg.findOne({
            _id: req.params.id
        });
        let delind = -1;
        for (let i = 0; i < building.items.length; i++) {
            if (building.items[i].name === req.body.name) {
                delind = i;
            };
        };
        if (delind != -1) {
            building.items.splice(delind, 1);
        }
        building.save();
    } catch (error) {
        console.log(error);
    }
});

// Add a new kind of item. This will only be used to add a new item to the list, NOT to change the number of items in a closet
app.put('/api/bldgs/:id', async (req, res) => {
    try {
        let building = await Bldg.findOne({
            _id: req.params.id
        });
        building.items.push({
            name: req.body.name,
            current_number: req.body.current_number,
            stocked_number: req.body.stocked_number,
        });
        building.save();
    } catch (error) {
        console.log(error);
    }
});

// Add or delete an item
app.put('/api/item/:id', async (req, res) => {
    try {
        let building = await Bldg.findOne({
            _id: req.params.id
        });
        for (let i = 0; i < building.items.length; i++) {
            if (building.items[i].name === req.body.name) {
                building.items[i].current_number += req.body.change;
                if (building.items[i].current_number < 0) {
                    building.items[i].current_number = 0;
                }
            };
        };
        building.save();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});

// Get the entire database of all buildings.
app.get('/api/bldgs', async (req, res) => {
    try {
        let buildings = await Bldg.find();
        res.send(buildings);
    } catch (error) {
        console.log(error);
    }
})

app.listen(3000, () => console.log('Server listening on port 3000!'));
