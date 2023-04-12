const express = require('express')

const router = express.Router();

router.post('/add-tour', (req, res) => {
    res.send('Hello');
})

router.patch('/update-tour', (req, res) => {
    res.send('Hello');
})

router.patch('/delete-tour', (req, res) => {
    res.send('Hello');
})



module.exports = router;