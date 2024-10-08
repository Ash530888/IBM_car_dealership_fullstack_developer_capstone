/*jshint esversion: 8 */

// imporing all dependencies
const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs'); // read file sync
const  cors = require('cors')

// Set up an Express server with MongoDB integration
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }));

// server will run on this port
const port = 3050

// Establish a connection to MongoDB use mongoose
mongoose.connect('mongodb://mongo_db:27017/', { dbName: 'dealershipsDB' })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Retrieve data from the file car_records.json
const cars_data = JSON.parse(fs.readFileSync("car_records.json", 'utf8'));
const Cars = require('./inventory')
try{
    Cars.deleteMany({}).then(() => {
        Cars.insertMany(cars_data['cars']);
      });
} catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
}

// Express route to home
app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API")
});

// GET cars by dealer ID
app.get('/cars/:id', async (req, res) => {
    try{
        const documents = await Cars.find({dealer_id: req.params.id});
        res.json(documents);
    } catch (error) {
        res.status(500).json({error: 'Error fetching documents'});
    }
});

// GET cars by dealer ID & make
app.get('/carsbymake/:id/:make', async (req, res) => {
    try{
        const documents = await Cars.find({dealer_id: req.params.id,
                                            make: req.params.make});
        res.json(documents);
    } catch (error) {
        res.status(500).json({error: 'Error fetching documents'});
    }
});

// GET cars by dealer ID & model
app.get('/carsbymodel/:id/:model', async (req, res) => {
    try{
        const documents = await Cars.find({dealer_id: req.params.id,
                                            model: req.params.model});
        res.json(documents);
    } catch (error) {
        res.status(500).json({error: 'Error fetching documents'});
    }
});

// GET cars by dealer ID & mileage constraint
app.get('/carsbymaxmileage/:id/:mileage', async (req, res) => {
    try{
        const mileage = req.params.mileage;
        let milaegeFilter = {};

        if(mileage === 5000){
            milaegeFilter.mileage = {$lte: mileage};
        }
        else if(mileage === 100000){
            milaegeFilter.mileage = {$lte: mileage, $gt: 5000};
        }
        else if(mileage === 150000){
            milaegeFilter.mileage = {$lte: mileage, $gt: 100000};
        }
        else if(mileage === 200000){
            milaegeFilter.mileage = {$lte: mileage, $gt: 150000};
        }
        else{
            milaegeFilter.mileage = {$gt: 200000};
        }

        const documents = await Cars.find({dealer_id: req.params.id,
                                            ...milaegeFilter});
        res.json(documents);
    } catch (error) {
        res.status(500).json({error: 'Error fetching documents'});
    }
});

// GET cars by dealer ID & price constraint
app.get('/carsbyprice/:id/:price', async (req, res) => {
    try{
        const price = req.params.price;
        let priceFilter = {};

        if(price === 20000){
            priceFilter.price = {$lte: price};
        }
        else if(price === 40000){
            priceFilter.price = {$lte: price, $gt: 20000};
        }
        else if(price === 60000){
            priceFilter.price = {$lte: price, $gt: 40000};
        }
        else if(price === 80000){
            priceFilter.price = {$lte: price, $gt: 60000};
        }
        else{
            priceFilter.price = {$gt: 80000};
        }

        const documents = await Cars.find({dealer_id: req.params.id,
                                            ...priceFilter});
        res.json(documents);
    } catch (error) {
        res.status(500).json({error: 'Error fetching documents'});
    }
});

// GET cars by dealer ID & min year
app.get('/carsbyyear/:id/:year', async (req, res) => {
    try{
        const documents = await Cars.find({dealer_id: req.params.id,
                                            year: {$gte: req.params.year}});
        res.json(documents);
    } catch (error) {
        res.status(500).json({error: 'Error fetching documents'});
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});