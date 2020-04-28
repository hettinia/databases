'use strict';

const mysql = require('mysql');

// Make a connection to localhost using MySQL hyfuser login credentials
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword'
});

// Create a database called meetup and connect it
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

connection.query("DROP DATABASE IF EXISTS meetup", function (err, result) {
    if (err) throw err;
    console.log("Database deleted");
});

connection.query("CREATE DATABASE meetup", function (err, result) {
    if (err) throw err;
    console.log("Database created");
});

connection.query("USE meetup", function (err, result) {
    if (err) throw err;
    console.log("Database connected");
});

// Create a table called Invitee with the following fields (invitee_no, invitee_name and invited_by)
const createInvitee = "CREATE TABLE Invitee (invitee_no INT(11), invitee_name VARCHAR(50), invited_by VARCHAR(50))";
connection.query(createInvitee, function (error, results) {
    if (error) throw error;
    console.log('Invitee table created');
});

// Create a table called Room with the following fields (room_no, room_name and floor_number)
const createRoom = "CREATE TABLE Room (room_no INT(11), room_name VARCHAR(50), floor_number INT(11))";
connection.query(createRoom, function (error, results) {
    if (error) throw error;
    console.log('Room table created');
});

// Create a table called Meeting with the following fields (meeting_no, meeting_title, starting_time, ending_time,room_no)
const createMeeting = "CREATE TABLE Meeting (meeting_no INT(11), meeting_title VARCHAR(50), starting_time DATETIME, ending_time DATETIME, room_no INT(11))";
connection.query(createMeeting, function (error, results) {
    if (error) throw error;
    console.log('Meeting table created');
});

// Insert 5 rows into Invitee table
const insertToInvitee = "INSERT INTO Invitee VALUES ?";
const inviteeValues = [
    [1, 'Abed Alrahman', 'Noer'],
    [2, 'Lokman', 'Wouter'],
    [3, 'Mohammad', 'Tjebbe'],
    [4, 'Karam', 'Unmesh'],
    [5, 'Nader', 'Fede']
];
connection.query(insertToInvitee, [inviteeValues], function(err) {
    if (err) throw err;
    console.log('5 rows inserted into Invitee table');
});

// Insert 5 rows into Room table 
const insertToRoom = "INSERT INTO Room VALUES ?";
const roomValues = [
    [11, 'Learning Loft', 1],
    [21, 'Indoctrination Location', 2],
    [33, 'Mind Expansion Mansion', 3],
    [19, 'Germination Potential', 2],
    [5, 'ABC Room', 1]
];
connection.query(insertToRoom, [roomValues], function(err) {
    if (err) throw err;
    console.log('5 rows inserted into Room table');
});

// Insert 5 rows into Meeting table (meeting_no, meeting_title, starting_time, ending_time,room_no)
const insertToMeeting = "INSERT INTO Meeting VALUES ?";
const meetingValues = [
    [1, 'HTML + CSS', '2020-01-01 09:00:00', '2020-01-01 10:30:00', 5],
    [2, 'Javascript', '2020-02-10 11:00:00', '2020-02-10 13:00:00', 19],
    [3, 'NodeJs', '2020-03-01 09:00:00', '2020-03-01 11:00:00', 21],
    [4, 'Database', '2020-04-01 10:00:00', '2020-04-01 12:00:00', 33],
    [5, 'React', '2020-04-15 10:30:00', '2020-04-15 12:30:00', 11]
];
connection.query(insertToMeeting, [meetingValues], function(err) {
    if (err) throw err;
    console.log('5 rows inserted into Meeting table');
});

// close connection 
connection.end();