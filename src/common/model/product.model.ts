interface ICategory {
  id: number;
  name: string;
  subCategories?: ICategory[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  material: string;
  style: string;
  imageUrl: string;
  category: ICategory;
}

export type { Product, ICategory };
