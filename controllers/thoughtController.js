const {Thought, User} = require('../models');
const {Types} = require('mongoose');

const notFound = "No thought with that ID";

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const updatedUser = await User.findOneAndUpdate(
                {_id: Types.ObjectId(req.body.userId)},
                {$addToSet: {thoughts: Types.ObjectId(thought._id)}},
                {runValidators: true, new: true}
            );
            updatedUser ? res.json(updatedUser) : res.status(404).json({message: notFound});
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: Types.ObjectId(req.params.thoughtId)});
            thought ? res.json(thought) : res.status(404).json({message: notFound});
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({_id: Types.ObjectId(req.params.thoughtId)});
            await User.findOneAndUpdate(
                {thoughts: Types.ObjectId(deletedThought._id)},
                {$pull: {thoughts: Types.ObjectId(deletedThought._id)}},
                {runValidators: true, new: true}
            );
            deletedThought ? res.json(deletedThought) : res.status(404).json({message: notFound});
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                {_id: Types.ObjectId(req.params.thoughtId)},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            updatedThought ? res.json(updatedThought) : res.status(404).json({message: notFound});

        } catch (e) {
            res.status(500).json(e);
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: Types.ObjectId(req.params.thoughtId)},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            );
            thought ? res.json(thought) : res.status(404).json({message: notFound});
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: Types.ObjectId(req.params.thoughtId)},
                {$pull: {reactions: Types.ObjectId(req.params.reactionId)}},
                {runValidators: true, new: true}
            );

            thought ? res.json(thought) : res.status(404).json({message: notFound});
        } catch (e) {
            res.status(500).json(e);
        }
    }
}
