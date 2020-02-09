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

router.delete("/delete", async (req, res, next) => {
    const { vacation_id } = req.body
    const { deleteVacation } = adminPoolFunctions
    const { getVacationsData } = poolFunctions
    const id = await deleteVacation({ vacation_id })
    if (!id) res.json({ errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    const result = await getVacationsData(req.query)
    res.json(result)
})


router.use(vacationValidation)


router.post("/add", async (req, res, next) => {
    const { newVacation } = req.body
    const { addVacation } = adminPoolFunctions
    const { getVacationsData } = poolFunctions
    const numRows = await addVacation(newVacation)
    if (!numRows) res.json({ errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    const result = await getVacationsData(req.query)
    res.json(result)
})

router.use("/edit",  async (req, res, next) => {
    const { id: vacation_id } = req.body.newVacation
    const { isVacationExist } = poolFunctions
    const vacation = await isVacationExist({ vacation_id})
    if (!vacation) res.json({ errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    next();
})


router.post("/edit", async (req, res, next) => {
    const { newVacation } = req.body
    const { updateVacation } = adminPoolFunctions
    const { getVacationsData } = poolFunctions
    const numRows = await updateVacation(newVacation)
    if (!numRows) res.json({ errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    const result = await getVacationsData(req.query)
    res.json(result)
})

module.exports = router;