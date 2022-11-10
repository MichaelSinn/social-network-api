const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: Schema.Types.String,
        required: true,
        maxLength: 280
    },
    username: {
        type: Schema.Types.String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date.now(),
        get: function (createdTime){
            return createdTime.format('dd-mm-yy');
        }
    }
});

module.exports = reactionSchema;