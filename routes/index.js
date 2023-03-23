const express = require('express')
const router = express.Router()
const Book = require('../models/book')
router.get('/' , async (req , res) => {
    let books
    try {
        book = await Book.find().sort({ceatedAt: 'desc' }).limit(10).exec() 
    }
    catch {
        books=[]
    }
    res.render('index', {books:books })
})

module.exports = router