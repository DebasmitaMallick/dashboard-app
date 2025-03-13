import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbPath = path.resolve('warehouse.db');

const connectDB = async () => {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
};

export default connectDB;
