import { getDatabase } from "./db.init";

const BanksTable = {
  getAvailable: async () => {
    try {
      let db = getDatabase()
      return await db.getAllAsync(`
        SELECT id,
          name,
          color_bg,
          color_text,
          created_at
        FROM banks
      `);
    } catch (error) {
      console.error('Error loading banks:', error);
      throw error;
    }
  }
}

export default BanksTable