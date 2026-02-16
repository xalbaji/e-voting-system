"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = initializeDatabase;
const promise_1 = require("mysql2/promise");
async function initializeDatabase() {
    console.log('Initializing database...');
    const connection = await (0, promise_1.createConnection)({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
    });
    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS evoting_db`);
        console.log('Database "evoting_db" created or already exists');
        await connection.query(`USE evoting_db`);
        const [tables] = await connection.query(`SHOW TABLES LIKE 'users'`);
        if (tables.length === 0) {
            console.log('Tables will be created by TypeORM synchronization');
        }
        console.log('Database initialization completed!');
    }
    catch (error) {
        console.error('Error initializing database:', error);
    }
    finally {
        await connection.end();
    }
}
if (require.main === module) {
    initializeDatabase();
}
//# sourceMappingURL=init-database.js.map