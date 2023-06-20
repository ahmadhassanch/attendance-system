export class Permissions {
  admin: boolean;
  procurement: boolean;
  sales: boolean;
  stock: boolean;
  accounts: boolean;
  approve_po: boolean;

  constructor(
    admin: boolean,
    procurement: boolean,
    sales: boolean,
    stock: boolean,
    accounts: boolean,
    approve_po: boolean,
  ) {
    this.admin = admin;
    this.procurement = procurement;
    this.sales = sales;
    this.stock = stock;
    this.accounts = accounts;
    this.approve_po = approve_po;
  }
}
