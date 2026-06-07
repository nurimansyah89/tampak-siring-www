import { Injectable, signal, WritableSignal } from '@angular/core';

export interface LoginResult {
  success: boolean;
  error?: string;
}

export interface UserSession {
  houseNo: string;
  isAdmin: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly VALID_HOUSE = 'Y06-12';
  private readonly VALID_PASSWORD = 'abcd123456';

  readonly currentUser: WritableSignal<UserSession | null> = signal(null);

  login(houseNo: string, password: string): LoginResult {
    if (houseNo.trim().toUpperCase() !== this.VALID_HOUSE) {
      return { success: false, error: 'No. rumah tidak ditemukan' };
    }

    if (password !== this.VALID_PASSWORD) {
      return { success: false, error: 'Password salah' };
    }

    this.currentUser.set({ houseNo: this.VALID_HOUSE, isAdmin: true });
    return { success: true };
  }

  logout(): void {
    this.currentUser.set(null);
  }

  forgotPassword(houseNo: string): LoginResult {
    if (houseNo.trim().toUpperCase() !== this.VALID_HOUSE) {
      return { success: false, error: 'No. rumah tidak ditemukan' };
    }

    return { success: true };
  }
}
