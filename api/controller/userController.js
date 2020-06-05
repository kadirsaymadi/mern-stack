const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

exports.signUp = async (req, res, next) => {

    const userData = {
        name: "kadir",
        lastName: "saymadi",
        email: "kadirsaymadi@gmail.com",
        password: "123",
    };

    userData.password = md5(userData.password);

    const {
        user,
        error
    } = await Users.createUser(userData);
    if (user) {
        res.json({
            statusCode: 200,
            response: {
                user
            }
        });
    } else {
        res.json({
            statusCode: 422,
            message: error.message
        });
    }
}

exports.signIn = async (req, res, next) => {

    req.body.password = md5(req.body.password);
    let { user, error } = await Users.getUserWithMail(req.body);
    if (user) {
        if (user.password === req.body.password) {

            const payload = {
                _id: user._id
            };
            const token = jwt.sign(payload, process.env.API_KEY, {
                expiresIn: 60 * 60 * 24 * 365 * 10
            });
            res.json({
                statusCode: 200,
                response: {
                    token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email
                    }
                }
            });
        } else {
            res.json({
                statusCode: 404,
                message: "Hatalı şifre."
            });
        }
    } else {
        res.json({
            code: 404,
            message: "Hatalı email. Böyle bir kullanıcı bulunamadı."
        });
    }
}

exports.getUser = async (req, res) => {

    const {
        user,
        error
    } = await Users.getUser({
        _id: req.params.userId
    });
    if (!error) {
        res.json({
            statusCode: 200,
            response: {
                user
            }
        });
    } else {
        res.json({
            statusCode: 404,
            message: error.message
        });
    }
}