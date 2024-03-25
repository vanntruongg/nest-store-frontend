import slugify from "slugify";

export class ProductUtil {
  static createSlug(name: string, id: string): string {
    const slug = slugify(name, {
      lower: true,
      locale: "vi",
    });
    return `/${slug}-${id}.html`;
  }

  static createSlugCategory(name: string, catId: number): string {
    const slug = slugify(name, {
      lower: true,
      locale: "vi",
    });
    return `/${slug}/${catId}`;
  }

  static extractProductIdFromSlug(slug: string): number {
    const parts = slug.split("-");
    const lastPart = parts[parts.length - 1];
    const productId = lastPart.split(".")[0];

    return parseInt(productId);
  }

  static formatPrice(
    price: number | string,
    options: {
      currency?: "VND" | "USD" | "EUR";
      notation?: Intl.NumberFormatOptions["notation"];
    } = {}
  ) {
    const { currency = "VND" } = options;

    const numericPrice = typeof price === "string" ? parseFloat(price) : price;

    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(numericPrice);
  }
}
