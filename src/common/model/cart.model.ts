interface IItem {
  id: number;
  quantity: number;
  price: number;
  name: string;
  category: string;
  imageUrl: string;
  stock: number;
}
interface ICartItem {
  email: string;
  items: IItem[];
  totalPrice: number;
}
interface IAddRequest {
  email: string;
  itemDto: {
    id: number;
    quantity: number;
    price: number;
    name: string;
    category: string;
    imageUrl: string;
  };
}
interface IUpdateCartRequest {
  email: string;
  itemId: number;
  quantity: number;
}

export type { ICartItem, IItem, IUpdateCartRequest, IAddRequest };
