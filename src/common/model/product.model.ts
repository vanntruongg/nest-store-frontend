interface Category {
  id: number;
  name: string;
  children?: Category[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  material: string;
  style: string;
  imageUrl: string;
  category: Category;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export type { CartItem, Product, Category };
