import type { Timestamp } from 'firebase/firestore';

/**
 * Firestore Timestamp를 한국 시간으로 변환하는 함수
 * @param timestamp Firestore Timestamp
 * @returns 한국 시간으로 포맷된 문자열 (예: "2024년 5월 27일 오후 2:30")
 */
export function formatLocalTime(timestamp: Timestamp): string {
  const date = timestamp.toDate();
  return date.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
