import { createConnection } from 'mysql2/promise';

async function fixPromotedStaff() {
  console.log('🔍 Checking promoted staff accounts...');
  
  const connection = await createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'evoting_db'
  });

  try {
    // Check all staff accounts
    const [staff] = await connection.execute(
      `SELECT id, first_name, last_name, email, role, status FROM users WHERE role = 'staff'`
    );
    
    console.log('\n📋 Current staff accounts:');
    console.table(staff);
    
    // Fix any staff with wrong status
    const [result] = await connection.execute(
      `UPDATE users SET status = 'approved' WHERE role = 'staff' AND status != 'approved'`
    );
    
    if ((result as any).affectedRows > 0) {
      console.log(`\n✅ Fixed ${(result as any).affectedRows} staff accounts - set status to 'approved'`);
    } else {
      console.log('\n✅ All staff accounts already have correct status');
    }
    
    // Show updated staff list
    const [updatedStaff] = await connection.execute(
      `SELECT id, first_name, last_name, email, role, status FROM users WHERE role = 'staff'`
    );
    
    console.log('\n📋 Updated staff accounts:');
    console.table(updatedStaff);
    
    console.log('\n✅ Staff accounts fixed! They can now login with their existing password.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await connection.end();
  }
}

fixPromotedStaff();