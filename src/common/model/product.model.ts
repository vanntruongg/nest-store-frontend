interface ICategory {
  category: Category;
  subCategories?: ICategory[];
}

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  material: string;
  style: string;
  imageUrl: string;
  category: Category;
}

interface ProductResponse {
  products: Product[];
  first: boolean;
  last: boolean;
  pageNumber: number;
  totalPages: number;
}

export type { Product, ICategory, Category, ProductResponse };
