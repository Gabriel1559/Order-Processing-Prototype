import sql from 'mssql';

const config = {
  user: 'user1', // your SQL login username
  password: 'User1', // your SQL login password
  server: 'localhost', // no need for \SQLEXPRESS when using TCP
  database: 'Weicon',
  port: 1433, // explicitly set port
  options: {
    encrypt: false, // for local dev
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(config);
    console.log('✅ Connected to SQL Server');
    return pool;
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    throw err;
  }
}
