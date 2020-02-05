const express = require("express")
const router = express.Router();
const verify = require("../utils/verifyJwt")
const poolFunctions = require("../db/poolFunctions")
const likeValidation = require("../validation/likeValidation")
const adminRouter = require("./admin.js")


// get vacations section

router.use("/", async (req, res, next) => {
    const { authorization } = req.headers
    const isVerify = await verify(authorization)
    if (!isVerify.id) return res.send({ errMessage: "please log in", redirectLog: true })
    req.body.user_id = isVerify.id
    req.query.user_id = isVerify.id
    req.body.role = isVerify.role
    next();
})

router.get("/all", async (req, res, next) => {
    const { getVacationsData } = poolFunctions
    const result = await getVacationsData(req.query)
    res.json(result)
})

//  admin route

router.use("/admin", adminRouter)

// post/delete like

router.use("/likes", (likeValidation))

router.use("/likes", async (req, res, next) => {
    console.log("add Like")
    const { role } = req.body
    if (role !== "user") res.json({ errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    next();
})

router.use("/likes", async (req, res, next) => {
    const { user, vacation_id } = req.body
    const { isUserExist, isVacationExist } = poolFunctions
    const checkUser = await isUserExist({ userName: user })
    const vacation = await isVacationExist({ vacation_id })
    if (!checkUser || !vacation) res.json({ errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    next();
})

router.use("/likes/add", async (req, res, next) => {
    const { isUserFollowVacation } = poolFunctions
    const isLike = await isUserFollowVacation(req.body)
    if (isLike) res.json({ errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    next();
})
router.post("/likes/add", async (req, res, next) => {
    const { user_id, vacation_id } = req.body
    const { postLike, getVacationsData, updateLikesNumber } = poolFunctions
    const id = await postLike({ user_id, vacation_id })
    if (!id) res.json({ errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    const affectedRows = await updateLikesNumber( 0, vacation_id )
    if (!affectedRows) res.json({ errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    const result = await getVacationsData(req.query)
    res.json(result)
})

router.use("/likes/undo", async (req, res, next) => {
    const { isUserFollowVacation } = poolFunctions
    const isLike = await isUserFollowVacation(req.body)
    if (!isLike) res.json({ errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    next();
})

router.post("/likes/undo", async (req, res, next) => {
    const { user_id, vacation_id } = req.body
    const { unLike, getVacationsData, updateLikesNumber } = poolFunctions
    const id = await unLike({ user_id, vacation_id })
    if (!id) res.json({ errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    const affectedRows = await updateLikesNumber( (-1), vacation_id )
    if (!affectedRows) res.json({ errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    const result = await getVacationsData(req.query)
    res.json(result)
})

module.exports = router;