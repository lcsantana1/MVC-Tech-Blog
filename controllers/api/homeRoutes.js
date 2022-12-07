//require express
const router = require('express').Router();
const { Blog, Comments, User } = require('../models');
const withAuth = require('../utils/auth');

//blog posts
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comments,
                    include: [
                        {
                            model: User,
                            attributes: ['name'],

                        },
                    ]

                }
            ],
        });

        // a specific blog post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name', 'id'],
                },
                {
                    model: Comments,
                    include: [
                        {
                            model: User,
                            attributes: ['name'],
                        },
                    ]
                }
            ],
        })
        const blog = blogData.get({ plain: true });
        console.log(blog)
        res.render('post', {
            blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/update/:id', withAuth, async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        })

        const blog = blogData.get({ plain: true });

        res.render('updatePost', {
            blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/post/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        })

        if (blogData.user_id !== req.session.user_id) {
            return
        }

        blogData.name = req.body.name;
        blogData.description = req.body.description;

        await blogData.save({ fields: ['name', 'description'] })

        const blog = blogData.get({ plain: true });

        res.render('post', {
            blog,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
})


router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: User,
                    attributes: ["id", "name"]
                },
                {
                    model: Comments,
                },
            ]
        })

        const blogPosts = blogData.map((blog) => blog.get({ plain: true }));

        console.log(blogPosts);
        res.render('dashboard', {
            blogPosts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

        //serializes data for handlebars
        const blogPosts = blogData.map((posts) => posts.get({ plain: true }));
        console.log(blogPost);
        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in
        });

    } catch (err) {

        res.status(500).json(err);
    }
});




module.exports = router;

