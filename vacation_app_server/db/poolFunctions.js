const pool = require("./Pool")
const queries = require('./poolQueries')
const moment = require("moment")

//  auth functions


async function isUserExist(params) {
    try {
        const { userName } = params
        const { isUserExistQuery } = queries
        const result = await pool.execute(isUserExistQuery(), [userName]);
        const [first] = result;
        const [user] = first
        return user
    }
    catch (ex) {
        console.error(ex)
        return null
    }
}

async function insertUser(body) {
    try {
        const { userName, password, firstName, lastName } = body
        const { insertUserQuery } = queries
        const result = await pool.execute(insertUserQuery(), [userName, firstName, lastName, password]);
        const [first] = result;
        const { insertId } = first
        return insertId
    }
    catch (ex) {
        console.error(ex)
        return null
    }
}

async function checkPasswords(body) {
    try {
        const { id, newPassword } = body
        const { checkPasswordsQuery } = queries
        const result = await pool.execute(checkPasswordsQuery(), [id, newPassword]);
        const [first] = result;
        return first
    }
    catch (ex) {
        console.error(ex)
        return null
    }
}

async function changePassword(body) {
    try {
        const { newPassword, id, hashedOldPassword } = body
        const { updatePasswordsQuery, changePasswordsQuery } = queries
        const myDate = moment().format('YYYY/MM/DD HH:mm:ss')
        const result = await pool.execute(changePasswordsQuery(), [newPassword, id]);
        const [first] = result;
        const { affectedRows } = first
        console.log(affectedRows)
        if (affectedRows) pool.execute(updatePasswordsQuery(), [id, hashedOldPassword, myDate]);
        return affectedRows
    }
    catch (ex) {
        console.error(ex)
        return null
    }
}


// vacations functions

async function getVacationsData(params) {
    try{
        const { user_id } = params
        const { getVacationsQuery } = queries
        const data = await pool.execute(getVacationsQuery(), [user_id]);
        const [first] = data;
        return first
    }
    catch (ex) {
        console.error(ex)
        return null
    }
}

async function isVacationExist(params) {
    try{
        const { vacation_id } = params
        const { isVacationExistQuery } = queries
        const result = await pool.execute(isVacationExistQuery(), [vacation_id]);
        const [first] = result;
        const [user] = first
        return user
    }
    catch (ex) {
        console.error(ex)
        return null
    }
}

async function isUserFollowVacation(params) {
    try{
        const { user_id, vacation_id } = params
        const { isUserFollowVacationQuery } = queries
        const result = await pool.execute(isUserFollowVacationQuery(), [user_id, vacation_id]);
        const [first] = result;
        const [user] = first
        return user
    }
    catch (ex) {
        console.error(ex)
        return null
    }
}

async function postLike(body) {
    try{
        const { user_id, vacation_id } = body
        const { postLikeQuery, updateLikesNumberQuery } = queries
        const myDate = moment().valueOf()
        console.log(myDate)
        const result = await pool.execute(postLikeQuery(), [user_id, vacation_id, myDate]);
        const [first] = result;
        const { insertId } = first
        if (insertId) await pool.execute(updateLikesNumberQuery(), [1, vacation_id]);
        return insertId
    }
    catch (ex) {
        console.error(ex)
        return null
    }
}

async function updateLikesNumber(num, vacation_id) {
    try {
        const { updateLikesNumberQuery } = queries
        const result = await pool.execute(updateLikesNumberQuery(), [num, vacation_id]);
        const [first] = result;
        const { affectedRows } = first
        return affectedRows
    }
    catch (ex) {
        console.error(ex)
        return null
    }
}

async function unLike(params) {
    try {
        const { vacation_id, user_id } = params
        const { unLikeQuery } = queries
        const result = await pool.execute(unLikeQuery(), [vacation_id, user_id]);
        const [first] = result;
        const { affectedRows } = first
        return affectedRows
    }
    catch (ex) {
        console.error(ex)
        return null
    }
}

module.exports = {
    isUserExist,
    insertUser,
    checkPasswords,
    changePassword,
    getVacationsData,
    isVacationExist,
    isUserFollowVacation,
    postLike,
    updateLikesNumber,
    unLike
}