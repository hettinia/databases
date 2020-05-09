'use strict';

const util = require('util');
const fs = require('fs');
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
const readFile = util.promisify(fs.readFile);

async function seedDatabase() {

  // Create Research_Papers query 
  const CREATE_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS Research_Papers (
      paper_id INT PRIMARY KEY,
      paper_title VARCHAR(100),
      conference VARCHAR(100),
      publish_date DATE
    );`;
  
    //
  const CREATE_AUTHORS_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS Authors_Papers (
      authorNo INT NOT NULL,
      paperId INT NOT NULL,
      CONSTRAINT FK_Author FOREIGN KEY (authorNo) REFERENCES Authors(author_no),
      CONSTRAINT FK_Paper FOREIGN KEY (paperId) REFERENCES Research_Papers(paper_id),
      CONSTRAINT PK_Author_Paper PRIMARY KEY (authorNo, paperId)
    );`;


  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_AUTHORS_PAPERS_TABLE);

    const authorsData = await readFile(__dirname + '/authors.json', 'utf8');
    const authors = await JSON.parse(authorsData);
    authors.forEach(async author => {
        await execQuery('INSERT INTO Authors SET ?', author);
    });

    const papersData = await readFile(__dirname + '/research_papers.json', 'utf8');
    const papers = await JSON.parse(papersData);
    papers.forEach(async paper => {
        await execQuery('INSERT INTO Research_Papers SET ?', paper);
    });

    const authorsPapersData = await readFile(__dirname + '/authors_papers.json', 'utf8');
    const authorsPapers = await JSON.parse(authorsPapersData);
    authorsPapers.forEach(async authorPaper => {
        await execQuery('INSERT INTO Authors_Papers SET ?', authorPaper);
    });
    
    const collaboratorsData = await readFile(__dirname + '/collaborators.json', 'utf8');
    const collaborators = await JSON.parse(collaboratorsData);
    collaborators.forEach(async collaborator => {
        await execQuery(`UPDATE Authors 
                        SET collaborator = ${collaborator.collaborator}
                        WHERE author_no = ${collaborator.author_no}`);
    }); 
    
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();