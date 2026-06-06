import { Injectable } from '@angular/core';

export interface LoginResult {
  success: boolean;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly VALID_HOUSE = 'Y06-12';
  private readonly VALID_PASSWORD = 'abcd123456';

  login(houseNo: string, password: string): LoginResult {
    if (houseNo.trim().toUpperCase() !== this.VALID_HOUSE) {
      return { success: false, error: 'No. rumah tidak ditemukan' };
    }

    if (password !== this.VALID_PASSWORD) {
      return { success: false, error: 'Password salah' };
    }

    return { success: true };
  }

  forgotPassword(houseNo: string): LoginResult {
    if (houseNo.trim().toUpperCase() !== this.VALID_HOUSE) {
      return { success: false, error: 'No. rumah tidak ditemukan' };
    }

    return { success: true };
  }
}
