const express = require('express');
const Contribution = require('../schemas/contribution')
const verifyToken = require('../middlewares/verifyToken')
const User = require('../schemas/user');
const contribution = require('../schemas/contribution');

const router = express.Router()

router.get('/all', async (req, res) => {
    try {
        const allContribution = await Contribution.find();
        console.log(allContribution)
       res.send(allContribution)
    } catch(err) {
        console.log(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const allContribution = await Contribution.findById(req.params.id);
       res.send(allContribution)
    } catch(err) {
        console.log(err)
    }
})



router.post('/add-new', verifyToken,  async (req, res) => {
        const newContribution = new Contribution({
            desc: req.body.desc,
        })
        await newContribution.save().then((data) => res.send(data)).catch((err) => res.send(err));
    
})


router.get('/all-contributions', async (req, res) => {
    const allContribution = await Contribution.find();
    res.send(allContribution)
})

router.get('/:user/all-contribution', verifyToken, async (req, res) => {
    const user = req.params.user;
    const existingUser = await User.findOne({userName: user}).populate('contributions')
    if (!existingUser) {
        res.send('Username not found, Kindly Register')
    }
    res.send(existingUser)
})


router.put('/:user/pick/:article', async (req, res) => {
    try {
        const userId = req.params.user;
        if (!userId) throw new Error('Kindly Login before picking up a problem')
    const articleId = req.params.article;
    const userToBeModified = await User.findById(userId)
    if (!userToBeModified) throw new Error('Kindly Register')
    userToBeModified?.contributions.push(articleId)
    await userToBeModified.save();
    await Contribution.updateOne(
        {
         _id: articleId
        },
        {
            $set: { picked: true, author: userId, authorName:userToBeModified.name }
        },  
    ).then(result => {
        res.send(result)
    }).catch(err => console.log(err))
    } catch(err) {
        res.status(400).send(err)
    }

}) 


router.put('/:user/accomplish/:article', async (req, res) => {
    const user = User.findById(req.params.user);
    try {
    const userId = req.params.user;
    const articleId = req.params.article;
    const POI = await Contribution.findById(articleId);
    if (POI.author!=userId) {
        throw new Error (`This contribution is picked by ${POI.authorName}, only they can change the status`)
    }
    else {
        await Contribution.updateOne(
            {
                _id: articleId
            },
            {
                $set: { accomplished: true}
            },  
        ).then(result => {
            res.send(result)
        }).catch(err => console.log(err))

    }
    } catch (err) {
        res.status(400).send(err.message)
    }
})


router.put('/:user/publish/:article', async (req, res) => {
    const userId = req.params.user;
    const articleId = req.params.article;
    const adminUser = User.findById(userId);
    if (adminUser.userLevel==1) {
        await Contribution.updateOne(
            {
                _id: articleId
            },
            {
                $set: { Published: true }
            },  
        ).then(result => {
            res.send(result)
        }).catch(err => console.log(err))
    }
    else {
        throw new Error ('You are not an admin User to publish this article')
    }
})

router.delete('/deleteAll', async(req,res) => {
    await Contribution.deleteMany({})
})







module.exports = router;