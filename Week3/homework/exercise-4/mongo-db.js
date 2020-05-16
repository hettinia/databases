'use strict';

const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'new_world';
 

async function seedDatabase() {
    const client = new MongoClient(url);
    try {
        // Use connect method to connect to the server
        await client.connect();

        // Create a new record (document) for my city
        const myCity = {
            name: "Alyarmouk", 
            countryCode: "SYR", 
            district: "Alyarmouk", 
            population: 800000
        };
        const myCityResult = await client.db(dbName).collection("city").insertOne(myCity);
        console.log(myCityResult);

        // Update that record with a new population
        const newPopulationResult = await client
            .db(dbName)
            .collection("city")
            .updateOne({ name: 'Alyarmouk' }, { $set: {population: 950000} });
        console.log(newPopulationResult);

        // finding by the city name
        const findByCityName = await client
            .db(dbName)
            .collection("city")
            .findOne({ name: 'Alyarmouk' });
        console.log(findByCityName);

        // finding by the country code
        const findByCountryCode = await client
            .db(dbName)
            .collection("city")
            .findOne({ countryCode: 'SYR' });
        console.log(findByCountryCode);

        // Delete the city
        const deleteByName = await client
            .db(dbName)
            .collection("city")
            .deleteOne({ name: 'Alyarmouk' });
        console.log(deleteByName);

    } catch(error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

seedDatabase();