const { User} = require('../models');

const userController = {
    //get all users
    getAllUsers (req,res) {
        User.find({})
        //populate all the friends info
        .populate({
            path: 'thoughts',
            select: '__v'
        })
        .select('-__v')
        .then(dbUserData=> res.json(dbUserData))
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
    },

    getUserId({params},res){
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'User not found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
    },

    createUser({body}, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err=>res.status(400).json(err));
    },

    postFriend({params,body},res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$addToSet: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No user found with this id'});
                return;
            } 
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteFriend({params, body}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No user found with this id'});
                return;
            } 
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    updateUser({params,body},res){
        User.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true},
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No User found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUser({params, body}, res){
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No user found with this id'});
                return;
            } 
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;