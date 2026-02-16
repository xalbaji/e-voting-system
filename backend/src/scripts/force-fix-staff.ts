import { createConnection } from 'mysql2/promise';
import * as bcrypt from 'bcrypt';

async function forceFixStaff() {
  console.log('🔧 Force fixing all staff accounts...');
  
  const connection = await createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'evoting_db'
  });

  try {
    // First, show all staff before fixing
    const [before] = await connection.execute(
      `SELECT id, first_name, last_name, email, role, status FROM users WHERE role = 'staff'`
    );
    
    console.log('\n📋 Staff accounts BEFORE fix:');
    console.table(before);

    // Force update all staff to have approved status
    const [result] = await connection.execute(
      `UPDATE users SET status = 'approved' WHERE role = 'staff'`
    );
    
    console.log(`\n✅ Updated ${(result as any).affectedRows} staff accounts to approved status`);

    // Show after fix
    const [after] = await connection.execute(
      `SELECT id, first_name, last_name, email, role, status FROM users WHERE role = 'staff'`
    );
    
    console.log('\n📋 Staff accounts AFTER fix:');
    console.table(after);

    // Also check if there are any voters that should be staff
    const [voters] = await connection.execute(
      `SELECT id, first_name, last_name, email, role, status FROM users WHERE role = 'voter' AND email LIKE '%staff%'`
    );
    
    if ((voters as any[]).length > 0) {
      console.log('\n⚠️ Found potential staff accounts with wrong role:');
      console.table(voters);
    }

    console.log('\n✅✅✅ FIX COMPLETE! Staff accounts can now login.');
    console.log('\n📝 Login with staff credentials:');
    console.log('   Use the email and password that was set for the account');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await connection.end();
  }
}

forceFixStaff();