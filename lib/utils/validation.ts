export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 6;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  if (!trimmed) {
    return { isValid: false, error: '이메일을 입력해주세요.' };
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return { isValid: false, error: '올바른 이메일 형식을 입력해주세요.' };
  }
  return { isValid: true };
}

export function validatePassword(password: string): ValidationResult {
  const trimmed = password.trim();
  if (!trimmed) {
    return { isValid: false, error: '비밀번호를 입력해주세요.' };
  }
  if (trimmed.length < MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      error: `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`,
    };
  }
  return { isValid: true };
}

export function validatePasswordMatch(
  password: string,
  confirmPassword: string
): ValidationResult {
  if (password !== confirmPassword) {
    return { isValid: false, error: '비밀번호가 일치하지 않습니다.' };
  }
  return { isValid: true };
}
