const mongoose = require("mongoose");

const reqCollectionSchema = mongoose.Schema({
    reqId: {
        type: String,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    phone_no: {
        type: String,
        required: true,
    },
    garbageType: {
        type: String,
        enum: ["dry", "wet", "mixed"],
        default: undefined,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "collected", "rejected"],
        default: "pending",
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    collectionDate: {
        type : Date,
        required : true
    }
}, {timestamps: true});

module.exports = mongoose.model("reqCollection", reqCollectionSchema);
