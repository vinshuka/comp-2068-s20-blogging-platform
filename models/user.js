const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        validate: [
            {
                validator: function (value) {
                    return this.emailConfirmation === value;
                },
                message: props => `${props.value} doesn't match the email confirmation`
            },
            {
                // DeprecationWarning: collection.count is deprecated
                // validator: async function (value) {
                //     const emailCount = await this.model('User').count(
                //         { email: value});
                //         return !emailCount;
                // },
                validator: async function (value) {
                    const emailCount = await this.model('User').countDocuments({ email: value});
                    return !emailCount;
                },
                message: props => `${props.value} exists. Please try a new email or login`
            }
        ]
    }
}, {
    timestamps: true,  
});

// Validation attributes
UserSchema.virtual('emailConfirmation')
.get(function () {
    return this._emailConfirmation;
})
.set(function (value) {
    this._emailConfirmation = value;
});

UserSchema.virtual('password')
.get(function () {
    return this._password;
})
.set(function (value) {
    this._password = value;
});

UserSchema.virtual('passwordConfirmation')
.get(function () {
    return this._password;
})
.set(function (value) {
    if (this.password !== value)
        this.invalidate('password', 'Password and Password Confirmation must match');
    this._passwordConfirmation = value;
});

// Helper attribute
UserSchema.virtual('fullname')
.get(function () {
    return `${this.firstName} ${this.lastName}`;
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model('User', UserSchema);