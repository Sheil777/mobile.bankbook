import * as SQLite from 'expo-sqlite';

// Database reference
let db;

export const getDatabase = () => db;

export async function initDatabase() {
  try {
    // Open database connection
    db = await SQLite.openDatabaseAsync('bankbook.db');
    
    // Create table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        image TEXT DEFAULT 'package.svg',
        color TEXT DEFAULT 'rgb(108, 32, 183)',
        about TEXT,
        mcc_id INTEGER,
        bank INTEGER DEFAULT 0,
        created_at DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Insert default categories (separate executions)
    // await db.execAsync(`INSERT INTO categories (name, image, color) VALUES ('Продукты', 'tbank.png', 'rgb(76, 175, 80)');`);
    // await db.execAsync(`INSERT INTO categories (name, image, color) VALUES ('Транспорт', 'tbank.png', 'rgb(76, 175, 80)');`);
    await insertDefaultCategories();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

async function insertDefaultCategories() {
  const defaultCategories = [
    { name: 'Продукты', image: 'tbank.png', color: 'rgb(76, 175, 80)' },
    { name: 'Транспорт', image: 'tbank.png', color: 'rgb(76, 175, 80)' }
  ];

  const categories = await db.getFirstAsync('SELECT COUNT(*) as count FROM categories')

  if(categories.count == 0)
    for (const category of defaultCategories) {
        await db.runAsync(
        `INSERT INTO categories (name, image, color) VALUES (?, ?, ?)`,
        [category.name, category.image, category.color]
        );
    }
}