import { createConnection } from 'mysql2/promise';
import * as bcrypt from 'bcrypt';

async function seedFullData() {
  console.log('🌱 Seeding database with sample data...');
  
  const connection = await createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'evoting_db'
  });

  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    await connection.execute('DELETE FROM votes');
    await connection.execute('DELETE FROM candidates');
    await connection.execute('DELETE FROM positions');
    await connection.execute('DELETE FROM elections');
    await connection.execute('DELETE FROM audit_logs');
    await connection.execute('DELETE FROM users WHERE role IN ("voter", "staff") AND email NOT IN ("admin@evoting.com")');
    
    console.log('✅ Cleared existing data');

    // Hash passwords
    const adminPassword = await bcrypt.hash('admin123', 10);
    const staffPassword = await bcrypt.hash('staff123', 10);
    const voterPassword = await bcrypt.hash('voter123', 10);

    // Create admin if not exists
    await connection.execute(
      `INSERT IGNORE INTO users (first_name, last_name, email, password, role, status, voter_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['System', 'Administrator', 'admin@evoting.com', adminPassword, 'admin', 'approved', 'ADMIN001']
    );
    console.log('✅ Admin account ready');

    // Create staff
    await connection.execute(
      `INSERT IGNORE INTO users (first_name, last_name, email, password, role, status, voter_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['Juphil', 'Kadusale', 'staff@evoting.com', staffPassword, 'staff', 'approved', 'STAFF001']
    );
    console.log('✅ Staff account created');

    // Create voters
    const voters = [
      ['Christine', 'Sartagoda', 'christine@example.com', '1234567890', 'VOTER001', 'approved'],
      ['John', 'Doe', 'john.doe@example.com', '1234567891', 'VOTER002', 'approved'],
      ['Jane', 'Smith', 'jane.smith@example.com', '1234567892', 'VOTER003', 'pending'],
      ['Bob', 'Johnson', 'bob.johnson@example.com', '1234567893', 'VOTER004', 'approved'],
    ];

    for (const [first, last, email, phone, voterId, status] of voters) {
      await connection.execute(
        `INSERT IGNORE INTO users (first_name, last_name, email, phone, voter_id, password, role, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [first, last, email, phone, voterId, voterPassword, 'voter', status]
      );
    }
    console.log('✅ Voter accounts created');

    // Create elections
    const [electionResult] = await connection.execute(
      `INSERT INTO elections (title, description, start_date, end_date, status, created_by_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['SSG ELECTION 2026-2027', 'Student Government Elections', '2026-05-01', '2026-05-30', 'completed', 1]
    );
    const electionId = (electionResult as any).insertId;

    const [election2Result] = await connection.execute(
      `INSERT INTO elections (title, description, start_date, end_date, status, created_by_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['bahog mataaaaaa', 'Sample Election', '2025-05-29', '2025-05-29', 'completed', 1]
    );
    const election2Id = (election2Result as any).insertId;

    console.log('✅ Elections created');

    // Create positions
    const [presidentResult] = await connection.execute(
      `INSERT INTO positions (election_id, position_name, description, max_votes) 
       VALUES (?, ?, ?, ?)`,
      [electionId, 'PRESIDENT', 'Student Body President', 1]
    );
    const presidentId = (presidentResult as any).insertId;

    const [vpResult] = await connection.execute(
      `INSERT INTO positions (election_id, position_name, description, max_votes) 
       VALUES (?, ?, ?, ?)`,
      [electionId, 'VICE PRESIDENT', 'Student Body Vice President', 1]
    );
    const vpId = (vpResult as any).insertId;

    console.log('✅ Positions created');

    // Create candidates
    const candidates = [
      ['BAHOG', 'MATA', presidentId, 'Candidate for President'],
      ['Christine', 'Sartagoda', presidentId, 'Candidate for President'],
      ['d', 'cdc', vpId, 'Candidate for Vice President'],
      ['cdwc', 'cwc', vpId, 'Candidate for Vice President'],
    ];

    for (const [first, last, posId, bio] of candidates) {
      await connection.execute(
        `INSERT INTO candidates (first_name, last_name, position_id, biography, status) 
         VALUES (?, ?, ?, ?, ?)`,
        [first, last, posId, bio, 'active']
      );
    }
    console.log('✅ Candidates created');

    // Create audit logs
    const auditLogs = [
      [1, 'admin@evoting.com', 'User logged out', 'System', '192.168.1.1'],
      [2, 'staff@evoting.com', 'User logged out', 'System', '192.168.1.2'],
      [3, 'christine@example.com', 'User logged out', 'System', '192.168.1.3'],
      [1, 'admin@evoting.com', 'Created election', 'Created SSG ELECTION 2026-2027', '192.168.1.1'],
      [2, 'staff@evoting.com', 'Approved voter registration', 'Approved VOTER001', '192.168.1.2'],
    ];

    for (const [userId, email, action, details, ip] of auditLogs) {
      await connection.execute(
        `INSERT INTO audit_logs (user_id, user_email, action, details, ip_address, created_at) 
         VALUES (?, ?, ?, ?, ?, DATE_SUB(NOW(), INTERVAL ? DAY))`,
        [userId, email, action, details, ip, Math.floor(Math.random() * 30)]
      );
    }
    console.log('✅ Audit logs created');

    console.log('\n✅✅✅ DATABASE SEEDING COMPLETED SUCCESSFULLY! ✅✅✅');
    console.log('\n📝 Login Credentials:');
    console.log('   Admin: admin@evoting.com / admin123');
    console.log('   Staff: staff@evoting.com / staff123');
    console.log('   Voter (approved): christine@example.com / voter123');
    console.log('   Voter (pending): jane.smith@example.com / voter123');
    
    console.log('\n📊 Sample Data:');
    console.log('   - 2 Elections (SSG ELECTION 2026-2027, bahog mataaaaaa)');
    console.log('   - 2 Positions (PRESIDENT, VICE PRESIDENT)');
    console.log('   - 4 Candidates');
    console.log('   - 4 Voters (3 approved, 1 pending)');
    console.log('   - 5 Audit Logs');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await connection.end();
  }
}

seedFullData();