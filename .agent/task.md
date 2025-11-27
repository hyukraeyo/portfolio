# 미사용 파일 및 코드 정리

## 작업 개요

프로젝트 내 사용되지 않는 파일과 코드를 식별하여 일괄 삭제했습니다.

## 삭제된 파일 목록

### Components

- `components/PostCard.tsx`, `components/PostCard.module.scss` (사용처 없음)
- `components/ClientSuspense.tsx` (사용처 없음)
- `components/ui/Button.tsx`, `components/ui/Button.module.scss` (사용처 없음)
- `components/ui/Chip.tsx`, `components/ui/Chip.module.scss` (사용처 없음)
- `components/ui/ErrorMessage.tsx`, `components/ui/ErrorMessage.module.scss` (사용처 없음)
- `components/ui/` 디렉토리 삭제

### Lib & Data

- `lib/data/projects.ts` (사용처 없음)
- `lib/utils/env.ts` (사용처 없음, `next.config.ts`는 process.env 직접 사용)
- `lib/utils/string.ts` (`PostCard.tsx` 삭제로 인해 미사용)

### Types

- `types/supabase.ts` (사용처 없음)

## 결과

불필요한 코드를 제거하여 프로젝트 구조를 단순화하고 유지보수성을 향상시켰습니다.
