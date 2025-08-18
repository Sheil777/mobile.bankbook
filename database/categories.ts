import { CategoryType } from "@/types/category";
import { getDatabase } from "./db.init";

export const Categories = {
  getAll: async () => {
    try {
      let db = getDatabase()
      return await db.getAllAsync('SELECT * FROM categories');
    } catch (error) {
      console.error('Error loading categories:', error);
      throw error;
    }
  },

  create: async (categoryData: CategoryType) => {
    try {
      let db = getDatabase()
      return await db.runAsync(
        `INSERT INTO categories (name, image, color) VALUES (?, ?, ?)`,
        [categoryData.name, categoryData.image, categoryData.color]
      );
    } catch (error) {
      console.error('Error create category:', error);
      throw error;
    }
  },

  deleteAll: async () => {
    try {
      let db = getDatabase()
      return await db.runAsync('DELETE FROM categories')
    } catch (error) {
      console.error('Error deleting categories:', error);
      throw error;
    }
  },
}