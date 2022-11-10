const {Schema} = require("mongoose");

const reactionSchema = new Schema({
    reactionBody: {
        type: Schema.Types.String,
        required: true,
        maxLength: 280
    },
    username: {
        type: Schema.Types.String,
        required: true
    },
    // TODO: Format the date
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (createdTime) {
            return createdTime.format('dd-mm-yy');
        }
    },
}, {
    id: false
});

module.exports = reactionSchema;