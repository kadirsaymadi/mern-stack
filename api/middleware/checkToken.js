const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.body.token || req.query.token;
    if (token) {
        // token kontrol
        jwt.verify(token, process.env.API_KEY, (err, decoded) => {
            if (err) {
                res.json({
                    code: 401,
                    message: "Token hatalı yada süresi dolmuş, lütfen tekrar giriş yapınız"
                });
            } else {
                req.userType = decoded.type;
                next();
            }
        });
    } else {
        res.json({
            code: 400,
            message: "Token Bulunamadı."
        });
    }
}