const {Schema, model} = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: Schema.Types.String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (createdTime){
                return createdTime.format('dd-mm-yy');
            }
        },
        username: {
            type: Schema.Types.String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;