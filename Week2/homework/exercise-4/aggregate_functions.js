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

  const ALL_PAPERS_WITH_COUNT_AUTHORS = `
    SELECT RP.paper_title, COUNT(AP.authorNo) AS Num_Of_Authors 
    FROM Research_Papers AS RP 
    LEFT JOIN Authors_Papers AS AP 
    ON RP.paper_id = AP.paperId 
    GROUP BY RP.paper_id `;

  const SUM_PAPERS_BY_FEMALE_AUTHORS = `
    SELECT COUNT(RP.paper_id) AS Papers_Num_By_Female
    FROM Authors_Papers AS AP 
    LEFT JOIN Research_Papers AS RP
    ON AP.paperId = RP.paper_id 
    LEFT JOIN Authors A 
    ON A.author_no = AP.authorNo 
    WHERE A.gender='f'`;

  const AVERAGE_OF_H_INDEX_PER_UNIVERSITY = `
    SELECT university, AVG(h_index) AS H_index_Average
     FROM Authors GROUP BY (university)`;

  const SUM_OF_PAPERS_PER_UNIVERSITY = `
    SELECT A.university, COUNT(DISTINCT AP.paperId) AS Sum_Of_Papers
    FROM Authors_Papers AS AP 
    JOIN Authors AS A
    ON AP.authorNo = A.author_no
    GROUP BY(A.university)`;

  const MINIMUM_MAXIMUM_H_INDEX_PER_UNIVERSITY = `
    SELECT university, MIN(h_index), MAX(h_index)
    FROM Authors
    GROUP BY university`;


  connection.connect();

  try {
    // call the function that returns promise
    console.log(await execQuery(ALL_PAPERS_WITH_COUNT_AUTHORS));
    console.log(await execQuery(SUM_PAPERS_BY_FEMALE_AUTHORS));
    console.log(await execQuery(AVERAGE_OF_H_INDEX_PER_UNIVERSITY));
    console.log(await execQuery(SUM_OF_PAPERS_PER_UNIVERSITY));
    console.log(await execQuery(MINIMUM_MAXIMUM_H_INDEX_PER_UNIVERSITY));
    
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();