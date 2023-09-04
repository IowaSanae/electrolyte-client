export interface Cart {
  cartid: number;
  userid: number;
  itemid: number;
  shopid: number;
  amount: number;
  option: string;
  overview: {
    id: number;
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
    liked: number;
    ctime: Date;
    shop_name: string;
    show_free_shipping: number;
    createdAt: Date;
    updatedAt: Date;
  };
  cart_tier_variations: {
    id: number;
    itemid: number;
    name: string;
    option: string;
    images: string;
    createdAt: string;
    updatedAt: string;
  };
}
