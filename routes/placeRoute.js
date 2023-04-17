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

router.get('/search', async (req, res) => {
    const { searchTerm } = req.query;
    try {
        const results = await Place.find({
            $or: [
                { name: { $regex: `.*${searchTerm}.*`, $options: 'i' } },
              ]
        });
        res.status(200).json(results);

    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.get('/:slug', async(req, res) => {
    const {slug} = req.params;
    try {
        const placebySlug = await Place.findOne({slug:slug});
        console.log(placebySlug)
        res.status(200).json(placebySlug);
    } catch(err){
        res.status(400).send(err.message);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const place = await Place.findOne({_id:id});
        console.log(place)
        res.status(200).json(place);

    } catch (err) {
        res.status(400).send(err.message)
    }
})



router.post('/create', async (req, res) => {
    try {
        const { name, address, slug, desc, category, Checkpoints } = req.body;
        console.log(Checkpoints)
        const place = new Place({
            name: name,
            adress: address,
            slug: slug,
            desc: desc,
            category: category,
            checkPoints: Checkpoints
        })
        await place.save().then((data) => res.send(data)).catch((err) => res.send(err));
    } catch {
        (err) => res.send(err)
    }
})

module.exports = router;