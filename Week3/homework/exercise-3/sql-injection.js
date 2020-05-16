function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = ${code}`,
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
}

// if we passed 
// name -> Netherlands OR 1=1 
// code -> NLD OR 1=1 
// that would take advantage of SQL-injection 
// and (fetch all the records in the database)
// to solve this we should rewrite the function as below:

function newGetPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
        `SELECT Population FROM ? WHERE Name = ? and code = ?`,
        [Country, name, code],
        function(err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error('Not found'));
            cb(null, result[0].name);
      }
    );
}