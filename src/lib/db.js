// src/lib/db.js
import mysql from 'mysql2/promise';

let connection;

export async function createConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
  }
  return connection;
}
