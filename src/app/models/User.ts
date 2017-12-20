export class User {
  username: string;
  password: string;
  writeAccess: boolean;
  adminAccess: boolean;
  public constructor(username?: string, password?: string, writeAccess?: boolean, adminAccess?: boolean) {
    this.username = username;
    this.password = password;
    this.writeAccess = writeAccess;
    this.adminAccess = adminAccess;
  }
}
