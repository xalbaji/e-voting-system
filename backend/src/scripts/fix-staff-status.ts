import { createConnection } from 'mysql2/promise';
import * as bcrypt from 'bcrypt';

async function fixStaffStatus() {
  console.log('🔧 Fixing staff account statuses...');
  
  const connection = await createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'evoting_db'
  });

  try {
    // Fix all staff accounts - set status to approved
    const [result] = await connection.execute(
      `UPDATE users SET status = 'approved' WHERE role = 'staff'`
    );
    
    console.log(`✅ Updated ${(result as any).affectedRows} staff accounts to approved status`);
    
    // List all staff accounts
    const [staff] = await connection.execute(
      `SELECT id, first_name, last_name, email, role, status FROM users WHERE role = 'staff'`
    );
    
    console.log('\n📋 Current staff accounts:');
    console.table(staff);
    
    console.log('\n✅ Staff accounts fixed! They can now login.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await connection.end();
  }
}

fixStaffStatus();