const Joi = require("@hapi/joi");


const likeSchema = Joi.object({
    user: Joi.string().min(2).max(30).required(),
    vacation_id: Joi.number().required(),
    user_id: Joi.number().required(),
    role: Joi.string().required(),
})


function likeValidation(req, res, next) {
    const { error } = likeSchema.validate(req.body);
    if (error) return res.json({errMessage: "there is somthing wrong, please log in agian", redirectLog: true })
    next();
}

module.exports = likeValidation;