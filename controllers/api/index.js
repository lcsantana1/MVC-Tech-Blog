const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
//const commentRoutes = require('./commentRoutes');


router.use('/users', userRoutes);
// create routes for /posts & /comments
router.use('/posts', postRoutes);
//router.use('/comment', commentRoutes);

module.exports = router;
