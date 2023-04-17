const express = require('express')
const Category = require('../schemas/category');

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const result = await Category.find();
        res.status(200).json(result);
    } catch(err) {
        res.status(400).send(err.message)
    }
})

router.get('/:slug', async(req,res) => {
    const {slug} = req.params;
    try {
        const category = await Category.findOne({slug: slug});
        res.status(200).json(category)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/create', async (req, res) => {
    try {
        const { title, desc, slug} = req.body;
        const category = new Category({
            name: title,
            slug: slug,
            desc: desc,
        })
        await category.save().then((data) => res.send(data)).catch((err) => res.send(err));
    } catch {
        (err) => res.send(err)
    }
})

module.exports = router;