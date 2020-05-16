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

    const accounts = [
        {
          account_number: 101,
          balance: 7500
        },
        {
          account_number: 102,
          balance: 15200
        },
    ];

    const accountChanges = [
        {
          change_number: 5001,
          account_number: 101,
          amount: -750,
          changed_date: '2020-04-26',
          remark: 'y',
        },
        {
          change_number: 5002,
          account_number: 102,
          amount: 100,
          changed_date: '2020-04-28',
          remark: 'y',
        },
    ];


  connection.connect();

  try {
    // call the function that returns promise
    await Promise.all(accounts.map(account =>
        execQuery('INSERT INTO account SET ?', account)
    )); 

    await Promise.all(accountChanges.map(change =>
        execQuery('INSERT INTO account_changes SET ?', change)
    )); 
    
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();