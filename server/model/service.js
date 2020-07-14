const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        amount: {
            type: String,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        community: {
            type: Schema.Types.ObjectId,
            ref: 'Community'
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Service", schema);
