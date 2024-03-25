interface Category {
  id: number;
  name: string;
}

interface ICategory {
  category: Category;
  subCategories?: ICategory[];
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

export type { CartItem, Product, ICategory };
