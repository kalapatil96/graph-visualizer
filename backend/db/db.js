// db/db.js
const neo4j = require('neo4j-driver');
const dotenv = require('dotenv');

// Load .env based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' 
    ? '.env.production' 
    : '.env.local';

dotenv.config({ path: envFile });

const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;

if (!uri || !user || !password) {
    console.error(`❌ Missing Neo4j credentials. Check ${envFile}`);
    process.exit(1);
}

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

module.exports = { driver };
