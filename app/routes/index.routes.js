const express = require("express");
const router = express.Router();
const db = require("../models");
const Post = db.Post;
const User = db.User;

router.get('/', async (req, res, next) => {
    try {
        const Posts = await Post.findAll();
        res.render('home', { Posts });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;