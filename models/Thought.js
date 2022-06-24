const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        // reactionId: {
        //     type: Schema.Types.ObjectId,
        //     default: () => new Types.ObjectId()
        // },  
        reactionBody:{
            type: String,
            required: 'You need to provide your reaction text.',
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: 'You need to provide a username',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
},
{
    toJSON: {
        getters: true
    },
    id: false
}
);

const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: 'You need to provide your thought text.',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'You need to provide a username',
            trim: true
        },
        reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

const Thought = model('Thought', ThoughtSchema);

ThoughtSchema.virtual('reactionCount').get(function(){
    //return this.reactions.length;
});

module.exports = Thought;