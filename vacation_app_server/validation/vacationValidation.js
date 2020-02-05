const Joi = require("@hapi/joi");


const dateTimeRegex = /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9])(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?(.[0-9]{1,6})?$/

const VacationSchema = Joi.object({
    description: Joi.string().min(10).max(24).required(),
    destination: Joi.string().min(3).max(40).required(),
    price: Joi.number().required(),
    image: Joi.string().min(10).max(300),
    start_time: Joi.string().min(19).regex(dateTimeRegex),
    end_time: Joi.string().min(19).regex(dateTimeRegex),
})


function vacationValidation(req, res, next) {
    const { error } = VacationSchema.validate(req.body.newVacation);
    if (error) return res.json({errMessage: "there is a problem with the data produced"})
    next();
}

module.exports = vacationValidation;