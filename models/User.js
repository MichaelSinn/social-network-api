const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: Schema.Types.String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: Schema.Types.String,
            required: true,
            unique: true,
            validate: {
                validator: function(v){
                    return /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/.test(v);
                }
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    }
);

const User = model('user', userSchema);

module.exports = User;