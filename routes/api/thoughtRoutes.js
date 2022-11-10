const router = require('express').Router();

const {
    getThoughts,
    createThought,
    getSingleThought,
    deleteThought,
    updateThought,
    addReaction,
    deleteReaction
} = require("../../controllers/thoughtController");

router.route('/')
    .get(getThoughts)
    .post(createThought);

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction)

module.exports = router;