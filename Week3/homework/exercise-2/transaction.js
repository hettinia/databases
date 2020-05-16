'use strict';

const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'HYF_Bank'
});

// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {

  connection.connect();

  try {
    // call the function that returns promise
    await execQuery('SET autocommit = 0');
    await execQuery('START TRANSACTION');
    await execQuery(
      `UPDATE account SET balance = balance - 1000 WHERE account_number = 101`,
    );
    await execQuery(
      `UPDATE account SET balance = balance + 1000 WHERE account_number = 102`,
    );
    await execQuery(`INSERT INTO account_changes SET ?`, {
      change_number: 5003,
      account_number: 101,
      amount: -1000,
      changed_date: '2020-04-30',
      remark: 'y',
    });
    await execQuery(`INSERT INTO account_changes SET ?`, {
      change_number: 5004,
      account_number: 102,
      amount: 1000,
      changed_date: '2020-04-30',
      remark: 'y',
    });
    await execQuery('COMMIT');
    
  } catch (error) {
        await execQuery('ROLLBACK'); // rollBack queries if error occurred
        console.error(error);
        connection.end();
  }

  connection.end();
}

seedDatabase();