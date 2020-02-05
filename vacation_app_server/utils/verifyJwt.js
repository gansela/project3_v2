const jwt = require("jsonwebtoken");

async function verifyJwt(token) {
    const result = await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return {id: 0}
        }
        console.log(decoded.payload.id)
        return {id: decoded.payload.id, userName: decoded.payload.userName, role: decoded.payload.role }
    })
    return result
}

module.exports = verifyJwt