import { ShopInterface } from './shop';

export interface Rooms {
    roomid: number;
    shopid: number;
    createdAt: string;
    updatedAt: string;
    shop_info: ShopInterface;
}