import { createConnection } from 'mysql2/promise';
import * as bcrypt from 'bcrypt';

async function fixAdmin() {
  console.log('🔧 Fixing admin account...');
  
  // Connect without database first to ensure database exists
  const connection = await createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
  });

  try {
    // Create database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS evoting_db');
    console.log('✅ Database ensured');
    
    // Use the database
    await connection.query('USE evoting_db');
    
    // Create users table if it doesn't exist (in case TypeORM hasn't created it yet)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20),
        voter_id VARCHAR(50) UNIQUE,
        password VARCHAR(255) NOT NULL,
        profile_photo VARCHAR(255),
        role VARCHAR(20) DEFAULT 'voter',
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table ensured');
    
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    console.log('✅ Password hashed');
    
    // Delete any existing admin
    await connection.execute('DELETE FROM users WHERE email = ?', ['admin@evoting.com']);
    console.log('✅ Removed existing admin');
    
    // Insert new admin
    await connection.execute(
      `INSERT INTO users (first_name, last_name, email, password, role, status, voter_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['System', 'Administrator', 'admin@evoting.com', hashedPassword, 'admin', 'approved', 'ADMIN001']
    );
    console.log('✅ New admin created');
    
    // Insert staff account
    const staffPassword = await bcrypt.hash('staff123', 10);
    await connection.execute(
      `INSERT IGNORE INTO users (first_name, last_name, email, password, role, status, voter_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['Staff', 'User', 'staff@evoting.com', staffPassword, 'staff', 'approved', 'STAFF001']
    );
    console.log('✅ Staff account ensured');
    
    // Verify the admin was created
    const [rows] = await connection.execute(
      'SELECT id, email, first_name, last_name, role, status FROM users WHERE email = ?',
      ['admin@evoting.com']
    );
    
    if ((rows as any[]).length > 0) {
      const admin = (rows as any[])[0];
      console.log('\n✅ Admin account verified:');
      console.log(`   ID: ${admin.id}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Name: ${admin.first_name} ${admin.last_name}`);
      console.log(`   Role: ${admin.role}`);
      console.log(`   Status: ${admin.status}`);
      console.log('\n📝 Login credentials:');
      console.log(`   Email: admin@evoting.com`);
      console.log(`   Password: admin123`);
    } else {
      console.log('❌ Failed to create admin');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await connection.end();
  }
}

fixAdmin();