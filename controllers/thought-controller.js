const {Thought, User} = require('../models');

const thoughtController = {
    //add thought to a User
    addThought({params,body}, res){
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {_id:params.id},
                    {$push: {thoughts: _id}},
                    {new: true}
                )
            })
            .then(dbUserData=>{
                if(!dbUserData){
                    res.status(404).json({message: 'User not found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    addReaction({params,body}, res){
        Thought.findOneAndUpdate(
            //thoughtId defined in the api routes
            {_id: params.thoughtId},
            //where is this defined at?
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(dbUserData=>{
            if(!dbUserData){
                res.status(404).json({message: 'User not found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    removeThought({params},res){
        Thought.findOneAndDelete({id: params.thoughtId})
            .then(deletedThought=>{
                if(!deletedThought){
                    res.status(404).json({message: 'Thought not found with this id'});
                    return;
                }
                //ask Ta: why do we need to delete the User? Or is it just pulling thought from an array in a User?
                return User.findOneAndDelete(
                    {_id: params.userId},
                    {$pull: {thoughts: params.thoughtId}},
                    {new: true}
                );
            })
            .then(dbUserData=>{
                if(!dbUserData){
                    res.status(404).json({message: 'User not found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err=> res.json(err));
    },

    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err=> res.json(err));
    }
};

module.exports = thoughtController;