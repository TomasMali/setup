const Pool = require('pg').Pool

const pool = new Pool({
    user: 'pi',
    host: 'tomasmali.it',
    database: 'pi_db',
    password: 'tommal',
    port: 5432,
})



module.exports = pool