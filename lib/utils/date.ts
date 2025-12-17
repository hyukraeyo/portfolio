/**
 * 근무 기간 계산
 * "2022.06 - 재직중" -> "1년 4개월"
 * "2021.02 - 2021.09" -> "8개월"
 */
export function calculateDuration(period: string): string {
  const [startStr, endStr] = period.split(' - ').map((s) => s.trim());
  if (!startStr) return '';

  const startDate = new Date(startStr.replace('.', '-'));
  const endDate =
    endStr === '재직중' ? new Date() : new Date(endStr.replace('.', '-'));

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '';

  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += endDate.getMonth();

  // 시작월 포함 계산 (예: 2월~9월은 8개월)
  months += 1;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0) {
    return remainingMonths > 0
      ? `${years}년 ${remainingMonths}개월`
      : `${years}년`;
  }
  return `${remainingMonths}개월`;
}
