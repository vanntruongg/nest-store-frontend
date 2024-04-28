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

export const orderStatus = [
  {
    type: "ALL",
    typeName: "Tất cả",
  },
  {
    type: "PENDING_CONFIRM",
    typeName: "Chờ xác nhận",
  },
  {
    type: "PROCESSING",
    typeName: "Đang xử lý",
  },
  {
    type: "SHIPPING",
    typeName: "Vận chuyển",
  },
  {
    type: "COMPLETED",
    typeName: "Hoàn thành",
  },
  {
    type: "CANCELED",
    typeName: "Đã hủy",
  },
];

export const statusClasses: Record<string, string> = {
  "Chờ xác nhận": "text-warning bg-warning",
  "Đang xử lý": "text-processing bg-processing",
  "Vận chuyển": "text-shipping bg-shipping",
  "Hoàn thành": "text-success bg-success",
  "Đã hủy": "text-danger bg-danger",
};
