import { createConnection } from 'mysql2/promise';
import * as bcrypt from 'bcrypt';

async function initializeDatabase() {
  console.log('Initializing database...');
  
  const connection = await createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
  });

  try {
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS evoting_db`);
    console.log('Database "evoting_db" created or already exists');
    
    // Use the database
    await connection.query(`USE evoting_db`);
    
    // Check if users table exists
    const [tables] = await connection.query(`SHOW TABLES LIKE 'users'`);
    
    if ((tables as any[]).length === 0) {
      console.log('Tables will be created by TypeORM synchronization');
    }
    
    console.log('Database initialization completed!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await connection.end();
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase();
}

export { initializeDatabase };