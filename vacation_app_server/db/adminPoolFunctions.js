const pool = require("./Pool")
const queries = require('./poolQueries')
const moment = require("moment")

async function deleteVacation(params) {
    const {vacation_id} = params
    const { deleteVacationQuery } = queries
    const result = await pool.execute(deleteVacationQuery(), [ vacation_id]);
    const [first] = result;
    const { affectedRows } = first
    return affectedRows
}

module.exports = {
    deleteVacation
}