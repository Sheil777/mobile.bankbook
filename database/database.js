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

      // Проверяем и заполняем начальными данными
      tx.executeSql(
        'SELECT COUNT(*) as count FROM users',
        [],
        (_, { rows }) => {
          if (rows.item(0).count === 0) {
            // Заполняем начальными данными
            const initialUsers = [
              { name: 'Admin', email: 'admin@example.com' },
              { name: 'User', email: 'user@example.com' }
            ];

            initialUsers.forEach(user => {
              tx.executeSql(
                'INSERT INTO users (name, email) VALUES (?, ?)',
                [user.name, user.email]
              );
            });

            console.log('Добавлены начальные пользователи');
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