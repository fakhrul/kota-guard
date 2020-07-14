const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
    {
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
        }]
        // status: {
        //     type: String,
        // },
        // residents: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'User'
        // }],
        // management: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'User'
        // }]


    },
    { timestamps: true }
);

module.exports = mongoose.model("Community", schema);
