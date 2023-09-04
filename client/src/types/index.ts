export interface cart {
  itemid: number;
  name: string;
  image: String[];
  currency: any;
  stock: any;
  status: any;
  sold: number;
  historical_sold: any;
  liked: any;
  liked_count: null | number;
  view_count: any;
  price: number;
  price_min: number;
  price_max: number;
  price_min_before_discount: number;
  price_max_before_discount: number;
  price_before_discount: number;
  has_lowest_price_guarantee: any;
  show_discount: any;
  raw_discount: any;
  discount: any;
  size_chart: string | undefined;
  tier_variations: any;
  shop_name: any;
  amount: number;
  newOption: string | undefined;
}
