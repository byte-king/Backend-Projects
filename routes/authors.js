const express = require('express')
const router = express.Router()
const Author = require('../models/author')


// All authors routes
router.get('/' , async (req , res) => {
    let searchOptions = {}
    if(req.query.name !== null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name,'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors
            , searchOptions: req.query
        })
    }
    catch {
        res.redirect('/')
    }
})

// New Author Route
router.get('/new' , (req,res) => {
    res.render('authors/new' , {author: new Author()});
})

// Creating Author Route
// async is usedto wait for the response from the database
router.post('/' , async (req,res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // await is used to wait for the response from the database

        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author:author,
            errorMessage: "Error creating author"
        })
    }
    
})


module.exports = router