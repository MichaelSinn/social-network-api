const {Schema} = require("mongoose");
const moment = require("moment");

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

    createdAt: {
        type: Date,
        default: Date.now,
        get: (v) => moment(v).format("dddd, MMMM Do YYYY, h:mm:ss a")
    },
}, {
    toJSON: {
        getters: true
    },
    id: false
});

module.exports = reactionSchema;