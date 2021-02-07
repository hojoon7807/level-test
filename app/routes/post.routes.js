const express = require("express");
const router = express.Router();
const db = require("../models");
const Post = db.Post;
const User = db.User;
const Op = db.Op

router.route('/')
    .get(async (req, res, next) => {
        try {
            const posts = await Post.findAll();
            res.render("post", { posts });
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const post = await Post.create({
                title: req.body.title,
                description: req.body.description,
                published: req.body.published ? req.body.published : false,
            });
            console.log(post);
            res.status(201).send(post).redirect("/post");
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.route('/:id')
    .get(async (req, res, next) => {
        try {
            const id = req.params.id
            const post = await Post.findByPk(id)
            res.render('post-detail', { post })
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .put(async (req, res, next) => {
        try {
            const post = await Post.update(req.body, {
                where: { id: req.params.id },
            });
            res.json(result).redirect(`/post/${req.params.id}`);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const result = await Post.destroy({ where: { id: req.params.id } });
            res.json(result).redirect('/post');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;