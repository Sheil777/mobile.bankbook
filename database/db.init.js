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
      CREATE TABLE IF NOT EXISTS banks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        color_bg TEXT DEFAULT 'white',
        color_text TEXT DEFAULT 'black',
        created_at DEFAULT CURRENT_TIMESTAMP
      );`
    );

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
    
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS current_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bank_id INTEGER NOT NULL,
        percent DECIMAL(10,2) NOT NULL,
        category_id INTEGER NOT NULL,
        always INTEGER DEFAULT 0,
        no_active INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await insertDefaultBanks();
    await insertDefaultCategories();
    await insertDefaultCurrentCategories();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

async function insertDefaultBanks() {
  const defaultBanks = [
    { id: 1, name: 'Тинькофф', backgroundColor: "yellow", colorText: "black"},
    { id: 2, name: 'Альфа-Банк', backgroundColor: "red", colorText: "white"},
    { id: 3, name: "ВТБ", backgroundColor: "rgb(28, 66, 159)", colorText: "white"},
    { id: 4, name: "Яндекс", backgroundColor: "red", colorText: "white"},
    { id: 5, name: "OZON", backgroundColor: "blue", colorText: "white"},
    { id: 6, name: "Сбербанк", backgroundColor: "green", colorText: "white"},
    { id: 7, name: "Халва", backgroundColor: "white", colorText: "black"},
  ];

  const banks = await db.getFirstAsync('SELECT COUNT(*) as count FROM Banks')

  if(banks.count == 0)
    for (const bank of defaultBanks) {
        await db.runAsync(
          `INSERT INTO banks (id, name, color_bg, color_text) VALUES (?, ?, ?, ?)`,
          [bank.id, bank.name, bank.backgroundColor, bank.colorText]
        );
    }
}

async function insertDefaultCategories() {
  const defaultCategories = [
    { id: 1, name: 'Продукты', image: 'tbank.png', color: 'rgb(76, 175, 80)' },
    { id: 2, name: 'Транспорт', image: 'tbank.png', color: 'rgb(76, 175, 80)' }
  ];

  const categories = await db.getFirstAsync('SELECT COUNT(*) as count FROM categories')

  if(categories.count == 0)
    for (const category of defaultCategories) {
        await db.runAsync(
          `INSERT INTO categories (id, name, image, color) VALUES (?, ?, ?, ?)`,
          [category.id, category.name, category.image, category.color]
        );
    }
}

async function insertDefaultCurrentCategories() {
  const defaultCurrentCategories = [
    { bankId: 1, percent: 5, category_id: 1},
    { bankId: 1, percent: 7, category_id: 2},
  ];

  const categories = await db.getFirstAsync('SELECT COUNT(*) as count FROM current_categories')

  if(categories.count == 0)
    for (const category of defaultCurrentCategories) {
        await db.runAsync(
          `INSERT INTO current_categories (bank_id, percent, category_id) VALUES (?, ?, ?)`,
          [category.bankId, category.percent, category.category_id]
        );
    }
}