const express = require('express')
const Category = require('../schemas/category')

const router = express.Router();

router.post('/add-category', async (req, res) => {
    try {
        const { name, slug } = req.body;
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            throw new Error('Category Already Exists')
        }
        const category = new Category({
            name: name,
            slug: slug,
        })
        await category.save().then(() => {
            res.send('Category Saved Successfully')
        }).catch((err) => {
            res.send(err);
        });
    } catch(err) {
        res.send(err)
    }
})

router.patch('/update-category', (req, res) => {
    res.send('Hello');
})

module.exports = router;