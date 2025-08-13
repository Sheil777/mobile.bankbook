import { executeSql } from './db.init';

export const CategoryService = {
  getAll: async () => {
    const result = await executeSql('SELECT * FROM categories');
    return result.rows._array;
  },
  
  getById: async (id) => {
    const result = await executeSql('SELECT * FROM categories WHERE id = ?', [id]);
    return result.rows._array[0];
  },
  
  create: async (categoryData) => {
    await executeSql(
      'INSERT INTO categories (name, image, color) VALUES (?, ?, ?)',
      [categoryData.name, categoryData.image, categoryData.color]
    );
  }
};