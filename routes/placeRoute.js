const express = require('express')
const Place = require('../schemas/place')

const router = express.Router();


// Gets all the users
router.get('/all', async (req, res) => {
    try {
        const allPlace = await Place.find();
        res.status(200).json(allPlace);

    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.post('/create', async (req, res) => {
    try {
        const { name, adress, slug, desc, category, checkPoints } = req.body;
        const place = new Place({
            name: name,
            adress: adress,
            slug: slug,
            desc: desc,
            category: category,
        })
        await place.save().then((data) => res.send(data)).catch((err) => res.send(err));
    } catch {
        (err) => res.send(err)
    }
})

module.exports = router;