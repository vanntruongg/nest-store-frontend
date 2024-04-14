export class IUser {
  id?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  isVerify: boolean;
  status: string;
  imageUrl?: string;
  roles: string[];

  constructor() {
    this.email = "";
    this.firstName = "";
    this.lastName = "";
    this.phone = "";
    this.address = "";
    this.isVerify = false;
    this.status = "";
    this.imageUrl = "";
    this.roles = [];
  }
}

export const RoleUser = {
  ROLE_ADMIN: "Quản trị viên",
  ROLE_USER: "Người dùng",
};

interface IUpdateUser {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  imageUrl: string;
  roles: string[];
}

interface IChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type { IUpdateUser, IChangePasswordRequest };
