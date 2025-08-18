export default interface CategoryType {
  category_id: number;
  name: string;
  image: string;
  color: string;
  always: boolean;
  no_active: boolean;
  created_at: string;

  bank_id?: number;
  ccategory_id?: number;
}