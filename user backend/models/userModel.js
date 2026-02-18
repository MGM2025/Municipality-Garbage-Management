const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    holdingNo : {
        type: String,
        required: true,
        unique: true
    },
    wardNo : {
        type: String,
        required: true,
        // unique: true
    },
    fullName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    profilePic : Buffer,
    isUser : {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("user", userSchema);