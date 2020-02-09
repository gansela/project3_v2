const Joi = require("@hapi/joi");


const dateTimeRegex = /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9])(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?(.[0-9]{1,6})?$/
const imageRegex = /(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/

const VacationSchema = Joi.object({
    id: Joi.number(),
    follows: Joi.number(),
    time_of_like: Joi.string().allow(null),
    description: Joi.string().min(10).max(240).required(),
    destination: Joi.string().min(3).max(40).required(),
    price: Joi.number().required(),
    image: Joi.string().min(10).max(300).regex(imageRegex).required(),
    start_date: Joi.string().min(18).regex(dateTimeRegex).required(),
    end_date: Joi.string().min(18).regex(dateTimeRegex).required(),
})


function vacationValidation(req, res, next) {
    const { error } = VacationSchema.validate(req.body.newVacation);
    console.log(req.body.newVacation)
    if (error) return res.json({ errMessage: "there is a problem with the data produced" })
    next();
}

module.exports = vacationValidation;