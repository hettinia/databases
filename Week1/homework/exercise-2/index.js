
const mysql = require('mysql');

// Make a connection to database using MySQL hyfuser login credentials
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'new_world'
});

// connect to database
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// What are the names of countries with population greater than 8 million?
const query1 = 'SELECT Name FROM country WHERE Population > 8000000';
connection.query(query1, function (error, results, fields) {
  if (error) throw error;
  console.log('What are the names of countries with population greater than 8 million?');
  console.log(results);
});

// What are the names of countries that have “land” in their names?
const query2 = 'SELECT Name FROM country WHERE Name LIKE "%land%"';
connection.query(query2, function (error, results, fields) {
  if (error) throw error;
  console.log('What are the names of countries that have “land” in their names?');
  console.log(results);
});

// What are the names of the cities with population in between 500,000 and 1 million?
const query3 = 'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000';
connection.query(query3, function (error, results, fields) {
  if (error) throw error;
  console.log('What are the names of the cities with population in between 500,000 and 1 million?');
  console.log(results);
});

// What's the name of all the countries on the continent ‘Europe’?
const query4 = 'SELECT Name FROM country WHERE Continent = "Europe"';
connection.query(query4, function (error, results, fields) {
  if (error) throw error;
  console.log("What's the name of all the countries on the continent ‘Europe’?");
  console.log(results);
});

// List all the countries in the descending order of their surface areas
const query5 = 'SELECT * FROM country ORDER BY SurfaceArea DESC';
connection.query(query5, function (error, results, fields) {
  if (error) throw error;
  console.log("List all the countries in the descending order of their surface areas");
  //console.log(results);
});

// What are the names of all the cities in the Netherlands?
const query6 = 'SELECT Name FROM city WHERE CountryCode = "NLD"';
connection.query(query6, function (error, results, fields) {
  if (error) throw error;
  console.log("What are the names of all the cities in the Netherlands?");
  console.log(results);
});

// What is the population of Rotterdam?
const query7 = 'SELECT population FROM city WHERE Name = "Rotterdam"';
connection.query(query7, function (error, results, fields) {
  if (error) throw error;
  console.log("What is the population of Rotterdam?");
  console.log(results);
});

// What's the top 10 countries by Surface Area?
const query8 = 'SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10';
connection.query(query8, function (error, results, fields) {
  if (error) throw error;
  console.log("What's the top 10 countries by Surface Area?");
  console.log(results);
});

// What's the top 10 most populated cities?
const query9 = 'SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10';
connection.query(query9, function (error, results, fields) {
  if (error) throw error;
  console.log("What's the top 10 most populated cities?");
  console.log(results);
});

// What is the population number of the world?
const query10 = 'SELECT SUM(Population) AS Total_Population FROM country';
connection.query(query10, function (error, results, fields) {
  if (error) throw error;
  console.log("What is the population number of the world?");
  console.log(results);
});

// close connection
connection.end();