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
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        postcode: {
            type: String,
        },
        country: {
            type: String,
        },
        logo: {
            type: String,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        residents: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        units: [{
            type: Schema.Types.ObjectId,
            ref: 'Unit'
        }]
     
    },
    { timestamps: true }
);

module.exports = mongoose.model("Community", schema);
