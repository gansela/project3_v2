const pool = require("./Pool")
const queries = require('./poolQueries')
const moment = require("moment")

//  auth functions


async function isUserExist(params) {
    const { userName } = params
    const { isUserExistQuery } = queries
    const result = await pool.execute(isUserExistQuery(), [userName]);
    const [first] = result;
    const [user] = first
    return user
}

async function insertUser(body) {
    const { userName, password, firstName, lastName } = body
    const { insertUserQuery } = queries
    const result = await pool.execute(insertUserQuery(), [userName, firstName, lastName, password]);
    const [first] = result;
    const { insertId } = first
    return insertId

}

async function checkPasswords(body) {
    const { id, newPassword } = body
    const { checkPasswordsQuery } = queries
    const result = await pool.execute(checkPasswordsQuery(), [id, newPassword]);
    const [first] = result;
    return first
}

async function changePassword(body) {
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


// vacations functions

async function getVacationsData(params) {
    const { user_id } = params
    const { getVacationsQuery } = queries
    const data = await pool.execute(getVacationsQuery(), [user_id]);
    const [first] = data;
    return first
}

async function isVacationExist(params) {
    const { vacation_id } = params
    const { isVacationExistQuery } = queries
    const result = await pool.execute(isVacationExistQuery(), [vacation_id]);
    const [first] = result;
    const [user] = first
    return user
}

async function isUserFollowVacation(params) {
    const { user_id, vacation_id } = params
    const { isUserFollowVacationQuery } = queries
    const result = await pool.execute(isUserFollowVacationQuery(), [user_id, vacation_id]);
    const [first] = result;
    const [user] = first
    return user
}

async function postLike(body) {
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

async function updateLikesNumber(num, vacation_id) {
    const { updateLikesNumberQuery } = queries
    const result = await pool.execute(updateLikesNumberQuery(), [num, vacation_id ]);
    const [first] = result;
    const { affectedRows } = first
    return affectedRows
}

async function unLike(params) {
    const {vacation_id, user_id} = params
    const { unLikeQuery } = queries
    const result = await pool.execute(unLikeQuery(), [ vacation_id, user_id ]);
    const [first] = result;
    const { affectedRows } = first
    return affectedRows
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