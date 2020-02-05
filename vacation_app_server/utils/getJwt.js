const jwt = require("jsonwebtoken");

function getJwt(payload) {
    const result = new Promise((resolve, reject) => {
        resolve(jwt.sign({ payload }, process.env.SECRET_KEY, { expiresIn: '72h' }))
    });
    return result
}

module.exports = getJwt