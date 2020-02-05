const express = require("express")
const router = express.Router();
const userValidation = require("../validation/userValidation")
const bcrypt = require('bcryptjs');
const poolFunctions = require("../db/poolFunctions")
const getJwt = require("../utils/getJwt")

const hashSalt = process.env.SALT
// const verify = require("../utils/verify")




router.use(userValidation)


// register  request chain

router.use("/register", async (req, res, next) => {
    const { firstName, lastName } = req.body
    if (!firstName || !lastName) res.json({ message: "there was a poblem with your details" })
    next()
})

router.use("/register", async (req, res, next) => {
    const { isUserExist } = poolFunctions
    const user = await isUserExist(req.body)
    if (user) res.json({ message: "email already exist" })
    next()
})

router.post("/register", async (req, res, next) => {
    const { insertUser } = poolFunctions
    const { password } = req.body
    const newPassword = bcrypt.hashSync(password, hashSalt)
    const id = await insertUser({ ...req.body, password: newPassword })
    if (!id) res.json({ message: "sign in failed" })
    res.send({ message: `sign in completed`, redirect: true })
})

// login and change password middlware

router.use("/", async (req, res, next) => {
    const { isUserExist } = poolFunctions
    const { password } = req.body
    const user = await isUserExist(req.body)
    if (!user) res.json({ message: "wrong user name or password" })
    const isPasswordGood = (bcrypt.compareSync(password, user.password))
    if (!isPasswordGood) res.json({ message: "wrong email or password" })
    req.body.id = user.id
    req.body.hashedOldPassword = user.password
    req.body.role = user.role
    next()
})

// login request chain

router.post("/login", async (req, res, next) => {
    const { userName, role } = req.body
    const token = await getJwt({ ...req.body, password: null })
    res.send({ message: `login completed`, redirect: true, key: token, details: userName, role:role })
})

//  change password chain


router.use("/changepassword", async (req, res, next) => {
    const { newPassword, confirmPassword } = req.body
    if (newPassword !== confirmPassword) res.json({ message: "there is a problom with your details" })
    next()
})

router.use("/changepassword", async (req, res, next) => {
    const { newPassword } = req.body
    const { checkPasswords } = poolFunctions
    const hashNewPassword = bcrypt.hashSync(newPassword, hashSalt)
    const isUsed = await checkPasswords({ ...req.body, newPassword: hashNewPassword })
    console.log(isUsed)
    if (isUsed.length) return res.json({ message: "new password needs to be different from last 3 passwords" })
    req.body.hashedPassword = hashNewPassword
    next()
})

router.post("/changepassword", async (req, res, next) => {
    const { hashedPassword } = req.body
    const { changePassword } = poolFunctions
    const isChange = await changePassword({ ...req.body, newPassword: hashedPassword })
    if (!isChange) res.send({ message: `password change failed.`, redirect: false })
    res.send({ message: `password changed, please log in`, redirect: true })
})

module.exports = router;