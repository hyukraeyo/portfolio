const ERROR_MESSAGES = {
  login: {
    'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않습니다.',
    'Email not confirmed': '이메일 인증이 필요합니다.',
  },
  signup: {
    'User already registered': '이미 등록된 이메일입니다.',
    'Password should be at least': '비밀번호는 최소 6자 이상이어야 합니다.',
  },
} as const;

function getErrorMessage(
  message: string,
  errorMap: Record<string, string>
): string {
  for (const [key, value] of Object.entries(errorMap)) {
    if (message.includes(key)) return value;
  }
  return message;
}

export function getLoginErrorMessage(message: string): string {
  return getErrorMessage(message, ERROR_MESSAGES.login);
}

export function getSignupErrorMessage(message: string): string {
  return getErrorMessage(message, ERROR_MESSAGES.signup);
}
