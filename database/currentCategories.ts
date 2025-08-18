import { getDatabase } from "./db.init";

const CurrentCategoriesTable = {
  getAll: async () => {
    try {
      let db = getDatabase()
      let currentCategories = await CurrentCategoriesTable.getSelectedBanks()

      for(let bank of currentCategories) {
        let categories = await CurrentCategoriesTable.getByBankId(bank.bank_id)
        
        console.log(categories)

        bank.categories = categories.length == 0 ? null : categories
      }

      return currentCategories
    } catch (error) {
      console.error('Error loading all current categories:', error);
      throw error;
    }
  },
  getByBankId: async (bankId: number) => {
    try {
      let db = getDatabase()
      return await db.getAllAsync(`
        SELECT cc.id as ccategory_id,
          bank_id,
          CONCAT(percent, '% ', c.name) AS name,
          category_id,
          always,
          no_active,
          cc.created_at 
        FROM current_categories AS cc LEFT JOIN categories AS c
          ON cc.category_id = c.id
        WHERE bank_id = ${bankId} AND category_id != 0
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
        SELECT bank_id,
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
  },

  deleteAll: async () => {
    try {
      let db = getDatabase()
      return await db.runAsync('DELETE FROM current_categories')
    } catch (error) {
      console.error('Error deleting current_categories:', error);
      throw error;
    }
  },
}

export default CurrentCategoriesTable