const { databasePath, initializeDatabase } = require('./database');

const db = initializeDatabase();
db.close();
console.log(`SQLite database ready: ${databasePath}`);
