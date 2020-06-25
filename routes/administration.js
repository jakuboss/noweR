//routing administracja kontami
const express = require('express');
const router = express.Router();

const User = require('../models/User');

//wyświetlenie listy użytkowników
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

//wyświetlenie strony do edycji użytkownika
router.get('/:id/edit', async (req, res) => {
    const users = await User.findById(req.params.id)
    console.info(req.params.id)
    try {
        res.render('administration/edit', {
            users: users,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/administration')
    }
})

//wysłanie zmian dot. użytkownika na serwer
router.put('/:id', async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)
        user.permission = req.body.permission,
            await user.save()
        res.redirect(`/administration`)
    } catch {
        res.render('administration', {
            user: user
        })
    }
})

//usunięcie użytkownika 
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