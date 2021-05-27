const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    profileImage: {
        type: String,
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ]
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password
            if (ret.profileImage) ret.profileImage = 'http://localhost:3000/' + ret.profileImage
        }
    }
})

userSchema.pre('save', function(next) {
    let user = this
    if (user.isModified('password')) {
        let hash = bcrypt.hashSync(user.password, 10)
        user.password = hash
        next()
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User