'use strict';

const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'researchs'
});

// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {

  const AUTHORS_WITH_COLLABORATORS = `
    SELECT A1.author_name AS Author, A2.author_name AS Collaborator
    FROM Authors AS A1 INNER JOIN Authors AS A2
    ON A1.collaborator = A2.author_no;`;

  const AUTHORS_WITH_PAPERS = `
    SELECT A.* , P.paper_title
    FROM Authors AS A LEFT JOIN Authors_Papers AS AP
    ON (A.author_no = AP.authorNo)
    LEFT JOIN Research_Papers AS P
    ON (P.paper_id = AP.paperId);`;

  connection.connect();

  try {
    // call the function that returns promise
    console.log(await execQuery(AUTHORS_WITH_COLLABORATORS));
    console.log(await execQuery(AUTHORS_WITH_PAPERS));
    
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();