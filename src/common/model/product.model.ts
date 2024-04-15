interface ICategory {
  category: Category;
  subCategories?: ICategory[];
}

interface Category {
  id: number;
  name: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  material?: string;
  style?: string;
  imageUrl: string;
  stock: number;
  category: Category;
}

interface ProductUpdate extends Omit<Product, "category"> {
  categoryId: number;
}

interface ProductCreate extends Omit<Product, "id" | "category"> {
  categoryId: number;
}

interface ProductResponse {
  products: Product[];
  first: boolean;
  last: boolean;
  pageNumber: number;
  totalPages: number;
}

export type {
  Product,
  ICategory,
  Category,
  ProductResponse,
  ProductUpdate,
  ProductCreate,
};
