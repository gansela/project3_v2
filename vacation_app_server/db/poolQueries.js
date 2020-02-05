//  auth queries


function isUserExistQuery() {
    return `select * from vacations.users where user_name = ?;`
}

function insertUserQuery() {
    return "INSERT INTO vacations.users ( `user_name`, `first_name`, `last_name`, `password`, `role`) VALUES ( ?, ?, ?, ?, 'user');"
}

function checkPasswordsQuery() {
    return "select password from vacations.old_passwords where user_id = ? and password = ? order by time_of_change desc limit 3;"
}

function changePasswordsQuery() {
    return "UPDATE `vacations`.`users` SET `password` = ? WHERE (`id` = ?) ;"
}

function updatePasswordsQuery() {
    return "INSERT INTO `vacations`.`old_passwords` ( `user_id`, `password`, `time_of_change`) VALUES ( ?, ?, ?);"
}

//  vacations queries

function isVacationExistQuery() {
    return `select * from vacations.vacations_table where id = ?;`
}

function getVacationsQuery() {
    return `SELECT vacations_table.*, time_of_like FROM vacations.vacations_table left join  (select * from vacations.vacation_likes where user_id = ?) as likes on  vacations_table.id = likes.vacation_id `
}

function isUserFollowVacationQuery() {
    return `SELECT * FROM vacations.vacation_likes where user_id = ? and vacation_id = ? `
}

function postLikeQuery() {
    return "INSERT INTO `vacations`.`vacation_likes` (`user_id`, `vacation_id`, `time_of_like`) VALUES (?, ?, ?);"
}

function updateLikesNumberQuery() {
    return "UPDATE `vacations`.`vacations_table` SET `vacations_table`.`follows` = `vacations_table`.`follows` + ? WHERE (`id` = ?)"
}

function unLikeQuery() {
    return "DELETE FROM `vacations`.`vacation_likes` WHERE `vacation_id` = ? and `user_id` = ?"
}

//  admin queries

function addVacation(){
    return "INSERT INTO `vacations`.`vacations_table` (`description`, `destination`, `image`, `start_date`, `end_date`, `price`, `follows`) VALUES (?, ?, ?, ?, ?, ?, '0');"
}

function deleteVacationQuery(){
    return "DELETE FROM `vacations`.`vacations_table` WHERE (`id` = ?);"
}
module.exports = {
    isUserExistQuery,
    insertUserQuery,
    checkPasswordsQuery,
    changePasswordsQuery,
    updatePasswordsQuery,
    getVacationsQuery,
    isVacationExistQuery,
    isUserFollowVacationQuery,
    postLikeQuery,
    updateLikesNumberQuery,
    unLikeQuery,
    deleteVacationQuery
}