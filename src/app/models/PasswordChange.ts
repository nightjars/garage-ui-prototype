export class PasswordChange {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  public constructor(currentPassword?: string, newPassword?: string, newPasswordConfirm?: string) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.newPasswordConfirm = newPasswordConfirm;
  }
}
