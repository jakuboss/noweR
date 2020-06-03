const express = require('express');
const router = express.Router();

const User = require('../models/User');


router.get('/', async (req, res) => {
    let searchOptions = {}

    if (req.query.email != null && req.query.email !== '') {
        searchOptions.email = new RegExp(req.query.email, 'i')
    }
    try {

        const users = await User.find(searchOptions)
        res.render('administration/index', {
            users: users,
            searchOptions: req.query,

        })
    } catch {
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req, res) => {
    const users = await User.findById(req.params.id)
    // const users2 = await User.find(searchOptions)
    console.info(req.params.id)
    try {
        res.render('administration/edit', {
            // users2: users2,
            users: users,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/administration')
    }

})

router.put('/:id', async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)

        user.permission = req.body.permission,
            await user.save()
        res.redirect(`/administration`)
    } catch {

        res.render('administration', {
            user: user,
            errorMessage: 'Error updating Author'
        })

    }
})


router.delete('/:id', async (req, res) => {
    let user

    try {
        user = await User.findById(req.params.id)
        await user.remove()
        res.redirect('/administration')
    } catch {
        if (user == null) {
            res.redirect('/')
        } else {
            res.redirect(`/administration`)
        }
    }
})


module.exports = router;