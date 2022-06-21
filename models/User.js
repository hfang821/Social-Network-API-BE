const {Schema, model} = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: string,
            unique: true,
            required: 'You need to provide a username',
            trim: true
        },
        email: {
            type: String,
            required: 'Please provide a valid email address',
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
);

const User = model('User', UserSchema);

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

module.exports = User;