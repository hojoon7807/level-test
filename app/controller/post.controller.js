const db = require("../models");
const Post = db.Post;
const User = db.User;
const Op = db.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "타이틀을 입력해주세요."
        });
        return;
    }

    // Create a Tutorial
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Tutorial in the database
    Post.create(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "포스팅 중 오류가 발생했습니다."
            });
        });
};

router.get('/', function (req, res) {
    Post.find({})                  // 1
        .sort('-createdAt')            // 1
        .exec(function (err, posts) {    // 1
            if (err) return res.json(err);
            res.render('posts/index', { posts: posts });
        });
});


router.post('/', function (req, res) {
    Post.create(req.body, function (err, post) {
        if (err) return res.json(err);
        res.redirect('/posts');
    });
});