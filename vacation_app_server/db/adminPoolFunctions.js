const pool = require("./Pool")
const queries = require('./poolQueries')
const moment = require("moment")

async function deleteVacation(params) {
    try {
        const { vacation_id } = params
        const { deleteVacationQuery } = queries
        const result = await pool.execute(deleteVacationQuery(), [vacation_id]);
        const [first] = result;
        const { affectedRows } = first
        return affectedRows
    }
    catch (ex) {
        console.error(ex)
        return null
    }
}

async function addVacation(vacation) {
    try {
        const { end_date, start_date, description, destination, image, price } = vacation
        const { addVacationQuery } = queries
        const result = await pool.execute(addVacationQuery(), [description, destination, image, start_date, end_date, price]);
        const [first] = result;
        const { affectedRows } = first
        return affectedRows
    }
    catch (ex) {
        console.error(ex)
        return null
    }
}


async function updateVacation(vacation) {
    try {
        const { id, end_date, start_date, description, destination, image, price, follows } = vacation
        const { updateVacationQuery } = queries
        const result = await pool.execute(updateVacationQuery(), [description, destination, image, start_date, end_date, price, id]);
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
    deleteVacation,
    addVacation,
    updateVacation
}