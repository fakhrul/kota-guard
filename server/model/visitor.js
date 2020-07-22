const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        visitorName: {
            type: String,
        },
        visitDate: {
            type: Date,
        },
        plateNumber: {
            type: String,
        },
        // remarks: {
        //     type: String,
        // },
        community: {
            type: Schema.Types.ObjectId,
            ref: 'Community'
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        unit: {
            type: Schema.Types.ObjectId,
            ref: 'Unit'
        },
        host: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        remarks: [{
            type: Schema.Types.ObjectId,
            ref: 'Remarks'
        }]

    },
    { timestamps: true }
);

module.exports = mongoose.model("Visitor", schema);
