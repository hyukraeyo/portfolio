/**
 * 날짜 포맷팅 유틸리티
 */

export function formatDate(
  dateString: string,
  options: {
    includeTime?: boolean;
  } = {}
): string {
  const date = new Date(dateString);
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(options.includeTime && {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  return date.toLocaleDateString('ko-KR', formatOptions);
}

export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

