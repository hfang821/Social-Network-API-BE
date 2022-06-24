const {Thought, User} = require('../models');

const thoughtController = {

    //get all thoughts
    getAllThoughts (req,res) {
        Thought.find({})
        //populate all the thoughts info
        // .populate({
        //     path: 'user',
        //     select: '__v'
        // })
        .select('-__v')
        .then(dbThoughtData=> res.json(dbThoughtData))
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get thought by id
    getThoughtById ({params},res) {
        Thought.findOne({_id: params.thoughtId})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Thought not found with this id!' })
                return;
            }
        res.json(dbThoughtData);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
    }, 

    //add thought to a User
    addThought({params,body}, res){
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {_id:params.userId},
                    {$push: {thoughts: _id}},
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
            .catch(err => res.json(err));
    },    

    updateThought({params,body},res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId}, 
            body, 
            {new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Thought not found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
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
                //We need to update the User object as well since the thought array is defined in the User object
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
            {$pull: {reactions: {_id: params.reactionId}}},
            {new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err=> res.json(err));
    }
};

module.exports = thoughtController;