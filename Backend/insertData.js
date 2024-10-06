const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://127.0.0.1:27017';


// Database Name
const dbName = 'mydb';

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Use the specified database
    const db = client.db(dbName);

    // Dummy mess data
    const data = [
      { id: 1, name: 'Anapurna Mess', image: 'path/to/mess1.jpg', menu: ['Breakfast: Item 1', 'Lunch: Item 4', 'Dinner: Item 7'] },
      { id: 2, name: 'Shivnery Mess', image: 'path/to/mess2.jpg', menu: ['Breakfast: Item 2', 'Lunch: Item 5', 'Dinner: Item 8'] },
      { id: 3, name: 'Krupa Mess', image: 'path/to/mess3.jpg', menu: ['Breakfast: Item 3', 'Lunch: Item 6', 'Dinner: Item 9'] },
    ];

    // Insert data into the collection
    const result = await db.collection('messes').insertMany(data);
    console.log(`${result.insertedCount} documents inserted`);
  } finally {
    // Close the client
    await client.close();
  }
}

// Run the script
run().catch(console.error);
