const express = require('express')
const Place = require('../schemas/place')
const Category = require('../schemas/category')

const router = express.Router();

// Get all place

router.get('/get-all-places', async (req, res) => {
    try {
         const allPlaces = await Place.find({});
         if (!allPlaces) {
            throw new Error('There is nothing in the DB');
         }
         res.send(allPlaces);
    } catch (err) {
        res.send({message: err});
    }
})

// Get place by Id

router.get('/get-place-by-id/:id', async (req, res) => {
    try{
        const place = req.params.id;
         const placeFound = await Place.find({_id:place});
         if (!placeFound) {
            throw new Error('There is nothing in the DB');
         }
         console.log(placeFound)
         res.send(placeFound);
    } catch(err) {
        res.send(err)
    }
})

// Get all place under a categoryId

router.get('/get-places-by-category/:id', async(req, res) => {
    const categoryId = req.params.id;
    await Place.find({category: categoryId}).then((data) => res.send(data))
})


// Add a place in the database


router.post('/add-place', async(req, res) => {
    try {
        const { name, adress, slug, desc, category, checkpoints } = req.body;
        const placeFound = await Place.findOne({name});
        if (placeFound) throw new Error ('Place Already Exists in the DB')
        if (name.length===0) {
            throw new Error ("Name Field Empty");
        }
        if (adress.length===0) {
            throw new Error ("Adress Field Empty");
        }
        var replaced = slug.split('-').join(' ');
        if (replaced!=name) {
            throw new Error ('Incorrect Slug');
        }
        if (checkpoints.length===0) {
            throw new Error ('Please Enter at least one checkpoint');
        }
        const categoryId = await Category.findOne({name: category})
        console.log(categoryId._id);
        const place = new Place ({
            name: name,
            adress: adress,
            slug: slug,
            desc: desc,
            category: categoryId.name,
            checkpoints: checkpoints
        })
        await place.save().then(() => {
            res.send('Data Saved Successfully into the DB');
        }).catch((error) => {
            res.send({message: error});
        })
    } catch (err) {
        res.send(err.message);
    }
})


// Update a place in the database

router.put('/update-place/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        await Place.findByIdAndUpdate(id, newData).then(() => {
            res.send('Successfully Updated');
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
    } catch (err) {
        res.send(err);
    }
})

module.exports = router;