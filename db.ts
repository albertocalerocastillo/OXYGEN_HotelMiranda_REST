import mysql from 'mysql2/promise';
import { Pool, PoolConnection } from 'mysql2/promise';

let pool: Pool | null = null;

async function connect(): Promise<PoolConnection> {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'root',
            database: process.env.DB_DATABASE || 'api',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    return pool.getConnection();
}

export { connect };