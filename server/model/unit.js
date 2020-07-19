const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        code: {
            type: String,
        },
        name: {
            type: String,
        },
        community: {
            type: Schema.Types.ObjectId,
            ref: 'Community'
        },
        resident: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Unit", schema);
