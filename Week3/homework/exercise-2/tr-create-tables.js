'use strict';

const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword'
});

// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {

  const CREATE_DATADASE = `CREATE DATABASE IF NOT EXISTS HYF_Bank;`;  
  const USE_DATABASE = `USE HYF_Bank;`;

  const CREATE_ACCOUNT_TABLE = `
    CREATE TABLE IF NOT EXISTS account (
      account_number INT PRIMARY KEY,
      balance FLOAT
    );`;

  const CREATE_ACCOUNT_CHANGES_TABLE = `
    CREATE TABLE IF NOT EXISTS account_changes (
      change_number INT PRIMARY KEY,
      account_number INT,
      amount FLOAT,
      changed_date DATE,
      remark ENUM('y', 'n'),
      CONSTRAINT FK_Account_Number FOREIGN KEY (account_number) REFERENCES account(account_number)
    );`;


  connection.connect();

  try {
    // call the function that returns promise
    await Promise.all[
        execQuery(CREATE_DATADASE), 
        execQuery(USE_DATABASE),
        execQuery(CREATE_ACCOUNT_TABLE),
        execQuery(CREATE_ACCOUNT_CHANGES_TABLE)
    ]; 
    
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();