import mysql from 'mysql2/promise';

interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  waitForConnections?: boolean;
  connectionLimit?: number;
  queueLimit?: number;
}

const config: DatabaseConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'crm',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(config);

export default pool;