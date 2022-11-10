const router = require('express').Router();

router.route('/')
    .get()
    .post();

router.route('/:id')
    .get()
    .put()
    .delete();

router.route('/:id/friends/:friendId')
    .post()
    .delete();

module.exports = router;