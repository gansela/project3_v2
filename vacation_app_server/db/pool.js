const mysql2 = require("mysql2")
const { DB_HOST, DB_USER, DB_PORT, DB_USER_PASS, DB_SCHEMA } = process.env

const pool = mysql2.createPool(
    {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_USER_PASS,
        database: DB_SCHEMA,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0

    }
)

module.exports = pool.promise() 