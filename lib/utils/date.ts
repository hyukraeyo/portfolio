/**
 * 날짜 포맷팅 유틸리티
 */

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

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



/**
 * 날짜 범위 문자열을 한글 형식으로 포맷팅
 * "2024-01-15 - 2024-03-20" -> "2024년 1월 15일 - 2024년 3월 20일"
 */
export function formatDateRange(dateRange: string): string {
  const parts = dateRange.split(' - ');
  if (parts.length !== 2) return dateRange;

  try {
    const startDate = new Date(parts[0].trim());
    const endDate = new Date(parts[1].trim());
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return dateRange;
    }

    // date-fns 포맷 사용
    const startStr = format(startDate, 'yyyy년 M월 d일', { locale: ko });
    const endStr = format(endDate, 'yyyy년 M월 d일', { locale: ko });
    
    return `${startStr} - ${endStr}`;
  } catch {
    return dateRange;
  }
}

