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
  role: string[];

  constructor() {
    this.email = "";
    this.firstName = "";
    this.lastName = "";
    this.phone = "";
    this.address = "";
    this.isVerify = false;
    this.status = "";
    this.imageUrl = "";
    this.role = [];
  }
}
