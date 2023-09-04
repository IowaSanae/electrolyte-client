export interface CategoryTree {
  catid: number;
  parent_catid: number;
  name: string;
  display_name: string;
  image: string;
  unselected_image: string;
  selected_image: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}
