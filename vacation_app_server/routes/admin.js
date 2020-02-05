const express = require("express")
const router = express.Router();
const adminPoolFunctions = require("../db/adminPoolFunctions")
const poolFunctions = require("../db/poolFunctions")
const vacationValidation = require("../validation/vacationValidation")


router.use("/", (req, res, next) => {
    if (!req.body.role || req.body.role !== "admin") return res.send({ errMessage: "you don't have the authorizations", redirectLog: true })
    next();
})

router.use("/delete", async (req, res, next) => {
    const { vacation_id } = req.body
    const { isVacationExist } = poolFunctions
    const vacation = await isVacationExist({ vacation_id })
    if (!vacation) res.json({ errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    next();
})

router.post("/delete", async (req, res, next) => {
    const { vacation_id } = req.body
    const { deleteVacation } = adminPoolFunctions
    const { getVacationsData } = poolFunctions
    const id = await deleteVacation({ vacation_id })
    if (!id) res.json({ errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    const result = await getVacationsData(req.query)
    res.json(result)
})


router.use("/", (vacationValidation))

router.use( "/", (req, res, next) => {
   
    res.send({errMessage:"hey hey"});
})


module.exports = router;