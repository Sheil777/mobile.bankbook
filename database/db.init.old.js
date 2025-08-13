import * as SQLite from 'expo-sqlite';

// Открываем базу данных
const db = SQLite.openDatabase('bankbook.db');

// Функция инициализации базы данных
export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Создаем таблицы
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS banks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE,
          color_bg TEXT DEFAULT 'white',
          color_text TEXT DEFAULT 'black' 
          created_at DEFAULT CURRENT_TIMESTAMP
        );`,
        [],
        () => console.log('Таблица banks создана'),
        (_, error) => {
          console.log('Ошибка при создании banks:', error);
          return false;
        }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            image TEXT DEFAULT 'package.svg',
            color TEXT DEFAULT 'rgb(108, 32, 183)',
            about TEXT,
            mcc_id INTEGER,
            bank INTEGER DEFAULT 0,
            created_at DEFAULT CURRENT_TIMESTAMP
        );`,
        [],
        () => console.log('Таблица categories создана'),
        (_, error) => reject(error)
      );

    db.transaction(tx => {
        tx.executeSql(
        `CREATE TABLE IF NOT EXISTS current_categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            bank_id INTEGER NOT NULL,
            percent INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            always INTEGER DEFAULT 0,
            no_active INTEGER DEFAULT 0,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        );`,
        [],
        () => console.log('Таблица current_categories создана успешно'),
        (_, error) => console.log('Ошибка при создании таблицы current_categories:', error)
        );
    });

// Проверяем и заполняем таблицу categories начальными данными
      tx.executeSql(
        'SELECT COUNT(*) as count FROM categories',
        [],
        (_, { rows }) => {
          if (rows.item(0).count === 0) {
            // Заполняем начальными данными
            const initialCategories = [
              { name: 'Продукты', image: 'tbank.png', color: 'rgb(76, 175, 80)' },
              { name: 'Транспорт', image: 'tbank.png', color: 'rgb(33, 150, 243)' },
              { name: 'Развлечения', image: 'tbank.png', color: 'rgb(156, 39, 176)' },
              { name: 'Кафе и рестораны', image: 'tbank.png', color: 'rgb(239, 108, 0)' },
              { name: 'Здоровье', image: 'tbank.png', color: 'rgb(233, 30, 99)' }
            ];

            initialCategories.forEach(category => {
              tx.executeSql(
                'INSERT INTO categories (name, image, color) VALUES (?, ?, ?)',
                [category.name, category.image, category.color]
              );
            });

            console.log('Добавлены начальные категории');
          }
          resolve();
        },
        (_, error) => reject(error)
      );
    });
  });
};

// Экспортируем объект базы данных для использования в других файлах
export const getDatabase = () => db;

// Экспортируем функции для работы с БД
export const executeSql = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};