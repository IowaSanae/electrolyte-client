export interface Order {
  id: null;
  orderid: string;
  userid: string;
  shopid: number;
  shop_name: string;
  item_groups_id: number[];
  amount: number[];
  option: any[];
  state: string;
  final_total: number;
  total_num_items: number;
  type: number;
  note: string;
  createdAt: string;
  updatedAt: string;
  user: {
    sex: string;
    role: string;
    userid: string;
    email: string;
    name: string;
    address: string;
    birthday: Date | string;
    not_new_user: boolean;
    phone: number;
    avatar: string;
  };
  posts: [
    {
      itemid: number;
      shopid: number;
      catid: number;
      name: string;
      image: string;
      historical_sold: number;
      price: number;
      price_min: number;
      stock: number;
      price_max: number;
      price_before_discount: number;
      price_min_before_discount: number;
      price_max_before_discount: number;
      discount: string;
      shop_rating: number;
      filename: null;
      shop_name: any | null;
      liked: boolean;
      ctime: string;
      show_free_shipping: boolean;
    }[]
  ];
}
