import { getDatabase } from "./db.init";

const CurrentCategoriesTable = {
  getByBankId: async (bankId: number) => {
    try {
      let db = getDatabase()
      return await db.getAllAsync(`
        SELECT cc.id,
          bank_id,
          CONCAT(percent, '% ', c.name) AS name,
          category_id,
          always,
          no_active,
          cc.created_at 
        FROM current_categories AS cc LEFT JOIN categories AS c
          ON cc.category_id = c.id
        WHERE bank_id = ${bankId}
      `);
    } catch (error) {
      console.error('Error loading currentCategories:', error);
      throw error;
    }
  },
  getSelectedBanks: async () => {
    try {
      let db = getDatabase()
      return await db.getAllAsync(`
        SELECT bank_id AS id,
          name,
          color_bg,
          color_text
        FROM current_categories AS cc LEFT JOIN banks AS b
          ON cc.bank_id = b.id
        GROUP BY bank_id, name, color_bg, color_text
      `);
    } catch (error) {
      console.error('Error loading selected banks:', error);
      throw error;
    }
  }
}

export default CurrentCategoriesTable