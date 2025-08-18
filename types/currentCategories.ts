import CategoryType from "./category";

export default interface CurrentCategoriesType {
  bank_id: number,
  name: string;
  color_bg: string;
  color_text: string;
  categories: CategoryType[] | null,
}
