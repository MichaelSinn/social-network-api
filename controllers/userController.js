const {User} = require('../models');
const {Types} = require('mongoose');

const notFound = "No user with that ID";

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find().select('-__v');
            res.json(users);
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: Types.ObjectId(req.params.userId)}).select('-__v').populate(['friends', 'thoughts']);
            user ? res.json(user) : res.status(404).json({message: notFound});
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete({_id: Types.ObjectId(req.params.userId)});
            deletedUser ? res.json(deletedUser) : res.status(404).json({message: notFound});
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                {_id: Types.ObjectId(req.params.userId)},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            updatedUser ? res.json(updatedUser) : res.status(404).json({message: notFound});

        } catch (e) {
            res.status(500).json(e);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: Types.ObjectId(req.params.userId)},
                {$addToSet: {friends: Types.ObjectId(req.params.friendId)}},
                {runValidators: true, new: true}
            );
            user ? res.json(user) : res.status(404).json({message: notFound});
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: Types.ObjectId(req.params.userId)},
                {$pull: {friends: Types.ObjectId(req.params.friendId)}},
                {runValidators: true, new: true}
            );

            user ? res.json(user) : res.status(404).json({message: notFound});
        } catch (e) {
            res.status(500).json(e);
        }
    }
}
