export const routes = {
  SHOP: "/shop",
  // auth,
  LOGIN: "/login",
  LOGOUT: "/logout",
  SIGNUP: "/sign-up",
  PROFILE: "/user/profile",
  CART: "/cart",
  ABOUTUS: "",
  GUIDE: "",
};

export type ItemNav = {
  label: string;
  href?: string;
  children?: ItemNav[];
};

export const navLinks: ItemNav[] = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Cửa hàng",
    href: "/shop",
  },
  {
    label: "Liên hệ",
    href: "/contact",
  },
  {
    label: "Khác",
    children: [
      {
        label: "Hướng dẫn mua hàng",
        href: "/guide",
      },
      {
        label: "Giới thiệu",
        href: "/introduce",
      },
    ],
  },
];

export const PRODUCT_CATEGORIES = [
  {
    label: "Men",
    value: "Quần" as const,
    featured: [
      {
        name: "Men's shirt",
        href: "#",
      },
      {
        name: "Men T-Shirt",
        href: "#",
      },
      {
        name: "Men's trousers",
        href: "#",
      },
    ],
  },
  {
    label: "Women",
    value: "Áo" as const,
    featured: [
      {
        name: "Favorite Icon Picks",
        href: "#",
      },
      {
        name: "New Arrivals",
        href: "#",
      },
      {
        name: "Bestselling Icons",
        href: "#",
      },
    ],
  },
];

export const paymentMethods = [
  {
    id: 1,
    method: "Thanh toán khi nhận hàng",
  },
  {
    id: 2,
    method: "Ví VN Pay",
  },
];
