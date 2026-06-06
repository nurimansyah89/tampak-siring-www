import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return success for valid credentials', () => {
    const result = service.login('Y06-12', 'abcd123456');
    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should ignore case for house number', () => {
    const result = service.login('y06-12', 'abcd123456');
    expect(result.success).toBe(true);
  });

  it('should return error for invalid house number', () => {
    const result = service.login('X99-99', 'abcd123456');
    expect(result.success).toBe(false);
    expect(result.error).toBe('No. rumah tidak ditemukan');
  });

  it('should return error for wrong password', () => {
    const result = service.login('Y06-12', 'wrongpassword');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Password salah');
  });

  it('should return error for empty input', () => {
    const result = service.login('', '');
    expect(result.success).toBe(false);
    expect(result.error).toBe('No. rumah tidak ditemukan');
  });

  describe('forgotPassword', () => {
    it('should return success for valid house number', () => {
      const result = service.forgotPassword('Y06-12');
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should ignore case for house number', () => {
      const result = service.forgotPassword('y06-12');
      expect(result.success).toBe(true);
    });

    it('should return error for invalid house number', () => {
      const result = service.forgotPassword('X99-99');
      expect(result.success).toBe(false);
      expect(result.error).toBe('No. rumah tidak ditemukan');
    });
  });
});
