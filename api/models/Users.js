const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { // kullanıcı adı
        type: String,
        required: true
    },
    lastName: { // kullanıcı soyadı
        type: String,
        required: true
    },
    email: { // kullanıcı email adresi 
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: { // kullanıcı şifresi
        type: String,
        required: true,
    },
    createdAt: { // kullanıcı sisteme eklenme tarihi
        type: Date,
        default: Date.now
    },
});

const Users = module.exports = mongoose.model('Users', userSchema, 'Users');

module.exports.getUserWithMail = async (userParams, selectFields = {}) => {
    try {
        return Users.findOne({
                email: userParams.email
            }, selectFields)
            .then((user) => {
                return {
                    user
                };
            })
            .catch((error) => {
                return {
                    error
                };
            });
    } catch (error) {
        return {
            error
        };
    }
}

module.exports.getUser = async (userParams) => {
    try {
        return Users.findById(mongoose.Types.ObjectId(userParams._id))
            .then((user) => {
                return {
                    user
                };
            })
            .catch((error) => {
                return {
                    error
                };
            });
    } catch (error) {
        return {
            error
        };
    }
}

module.exports.createUser = async (userParams) => {

    const user = new Users(userParams);
    try {
        return user.save()
            .then(async (savedUser) => {
                return {
                    user: savedUser
                };
            })
            .catch((error) => {
                return {
                    error
                };
            });
    } catch (error) {
        return {
            error
        };
    }
}