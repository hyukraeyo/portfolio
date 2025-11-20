'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { formatDateRange } from '@/lib/utils/date';
import 'react-day-picker/dist/style.css';
import styles from './DateRangePicker.module.scss';

interface DateRangePickerProps {
  value?: string; // "2024-01-15 - 2024-03-20" 형식
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}

// 날짜 파싱 헬퍼 함수 (컴포넌트 외부로 이동하여 재생성 방지)
const parseDateRange = (
  dateValue: string | undefined
): DateRange | undefined => {
  if (!dateValue) return undefined;

  const parts = dateValue.split(' - ');
  if (parts.length !== 2) return undefined;

  const [startStr, endStr] = parts.map((s) => s.trim());
  const parseDate = (dateStr: string): Date | undefined => {
    const normalized = dateStr.replace(/\./g, '-');
    const date = new Date(normalized);
    return !isNaN(date.getTime()) ? date : undefined;
  };

  const startDate = parseDate(startStr);
  const endDate = parseDate(endStr);

  if (startDate && endDate) return { from: startDate, to: endDate };
  if (startDate) return { from: startDate, to: undefined };
  return undefined;
};

export default function DateRangePicker({
  value,
  onChange,
  placeholder = '시작 날짜와 종료 날짜를 선택하세요',
  id,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(() =>
    parseDateRange(value)
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);

  // onChange ref 업데이트
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // value 변경 시 range 동기화
  useEffect(() => {
    const parsedRange = parseDateRange(value);
    setRange(parsedRange);
  }, [value]);

  // 달력 열릴 때 value 기반으로 range 복원
  useEffect(() => {
    if (isOpen) {
      setRange(parseDateRange(value));
    }
  }, [isOpen, value]);

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // 표시용 날짜 포맷팅 (메모이제이션)
  const displayValue = useMemo(
    () => (value ? formatDateRange(value) : placeholder),
    [value, placeholder]
  );

  // 상태 계산 (메모이제이션)
  const hasValue = !!value;
  const hasCompleteRange = !!(range?.from && range?.to);
  const showActionButtons = hasCompleteRange || !!(range?.from && !range?.to);

  // 핸들러 함수들 (메모이제이션)
  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  const handleApply = useCallback(() => {
    if (!range?.from || !range?.to) return;

    const formatted = `${format(range.from, 'yyyy-MM-dd', { locale: ko })} - ${format(range.to, 'yyyy-MM-dd', { locale: ko })}`;
    onChangeRef.current(formatted);
    setIsOpen(false);
  }, [range]);

  const handleCancel = useCallback(() => {
    setRange(parseDateRange(value));
    setIsOpen(false);
  }, [value]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setRange(undefined);
    onChangeRef.current('');
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div
        className={styles.inputWrapper}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <input
          id={id}
          type="text"
          readOnly
          value={displayValue}
          className={`${styles.input} ${hasValue ? styles.hasValue : ''}`}
          placeholder={placeholder}
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
        />
        <svg
          className={styles.calendarIcon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {hasValue && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="날짜 초기화"
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div className={styles.calendarWrapper}>
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            locale={ko}
            numberOfMonths={2}
            className={styles.calendar}
          />
          {showActionButtons && (
            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancel}
              >
                취소
              </button>
              <button
                type="button"
                className={styles.applyButton}
                onClick={handleApply}
                disabled={!hasCompleteRange}
              >
                적용
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
