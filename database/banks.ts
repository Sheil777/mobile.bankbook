import { BankType } from "@/types/bank";
import { getDatabase } from "./db.init";

const BanksTable = {
  getAvailable: async () => {
    try {
      let db = getDatabase()
      return await db.getAllAsync(`
        SELECT b.id,
          b.name,
          color_bg,
          color_text
        FROM banks AS b LEFT JOIN current_categories AS cc
          ON b.id = cc.bank_id
        WHERE cc.bank_id IS NULL;
      `);
    } catch (error) {
      console.error('Error loading banks:', error);
      throw error;
    }
  },
  create: async (bank: BankType) => {
    try {
      let db = getDatabase()
      await db.runAsync(
        `INSERT INTO banks (id, name, color_bg, color_text) VALUES (?, ?, ?, ?)`,
        [bank.id, bank.name, bank.color_bg, bank.color_text]
      );
    } catch (error) {
      console.error('Error create banks:', error);
      throw error;
    }
  }
}

export default BanksTable