const {User} = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
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
            const user = await User.findOne({_id: req.params.userId});
            user ? res.json(user) : res.status(404).json({message: "No user with that ID"});
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async deleteUser(req, res){
        try{
            const deletedUser = await User.findOneAndDelete({_id: req.params.userId});
            deletedUser ? res.json(deletedUser) : res.status(404).json({message: "No user with that ID"});
        }catch(e){
            res.status(500).json(e);
        }
    },

    async updateUser(req, res){
        try{
            const updatedUser = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            updatedUser ? res.json(updatedUser) : res.status(404).json({message: "No user with that ID"});

        }catch(e){
            res.status(500).json(e);
        }
    }
}
