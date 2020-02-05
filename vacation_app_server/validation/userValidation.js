const Joi = require("@hapi/joi");


const userSchema = Joi.object({
    userName: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(8).max(30).required(),
    firstName: Joi.string().min(2).max(30),
    lastName: Joi.string().min(2).max(50)
})

const changePassSchema = Joi.object({
    userName: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(8).max(30).required(),
    newPassword: Joi.string().min(8).max(30).required(),
    confirmPassword: Joi.string().min(8).max(30).required()
})

function userValidation(req, res, next) {
    const { error } = req.body.newPassword? changePassSchema.validate(req.body) :userSchema.validate(req.body);
    if (error) return res.json({ message: "there is a problom with your details" })
    next();
}

module.exports = userValidation;