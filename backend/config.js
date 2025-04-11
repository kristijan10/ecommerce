import mysql from "mysql2/promise";

// Railway automatski postavlja MYSQL_URL — koristi se kad je app deployovana
const urlDB = process.env.MYSQL_URL;

// MYSQL_PUBLIC_URL koristiš lokalno u .env fajlu
const publicDB = process.env.MYSQL_PUBLIC_URL;

export const pool = mysql.createPool({
  uri: urlDB ?? publicDB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
