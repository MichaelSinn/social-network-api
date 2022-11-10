const {Thought} = require('../models');
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
            res.json(thought);
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
                {$addToSet: {friends: Types.ObjectId(req.params.friendId)}},
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
                {$pull: {friends: Types.ObjectId(req.params.friendId)}},
                {runValidators: true, new: true}
            );

            thought ? res.json(thought) : res.status(404).json({message: notFound});
        } catch (e) {
            res.status(500).json(e);
        }
    }
}
