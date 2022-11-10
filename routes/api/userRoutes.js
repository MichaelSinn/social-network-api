const router = require('express').Router();
const {getUsers, getSingleUser, createUser, deleteUser, updateUser} = require("../../controllers/userController");

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:id/friends/:friendId')
    .post()
    .delete();

module.exports = router;