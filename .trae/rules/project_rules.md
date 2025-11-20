# 프로젝트 규칙 (TRAE 적용)

## 1. 기본 설정 및 폴더 구조
- Next.js 15+ App Router 사용, TypeScript 필수, React 19+ 사용
- 폴더 구조: app/, components/, lib/, public/
- 컴포넌트: PascalCase, 유틸리티: camelCase, 폴더: kebab-case
- 환경변수는 env.ts에서 검증, NEXT_PUBLIC_ prefix 사용

## 2. 컴포넌트 아키텍처
- 기본적으로 Server Components 사용, 필요시만 'use client'
- 하나의 컴포넌트는 하나의 역할만 수행
- 공통 컴포넌트는 components/에 분리
- Props 타입은 TypeScript로 명확히 정의

## 3. 성능 최적화
- next/image 사용, width/height 명시
- next/font 사용, variable 속성으로 CSS 변수 활용
- 메타데이터는 metadata 객체 또는 generateMetadata 함수 사용
- 동적 import는 필요한 경우에만

## 4. 데이터 패칭/서버 액션
- Server Components에서 fetch API 사용, async/await 활용
- 캐싱 전략 명시: SSG/SSR/ISR
- 서버 액션은 app/actions/에 분리, 'use server' 지시어 사용

## 5. 라우팅/레이아웃
- App Router 구조, 동적 라우트는 [slug] 사용
- 중첩 레이아웃 활용, loading/error/not-found 파일 활용

## 6. 스타일링
- SCSS 기본 사용, CSS Modules 권장(*.module.scss)
- SCSS import는 항상 @use 사용
- 공통 변수는 app/globals.scss 또는 styles/_variables.scss에 정의

## 7. TypeScript
- 엄격한 타입 체크, any 사용 금지(필요시 unknown)
- 공용 타입은 types/에 분리
- Props/API 응답 타입 명확히 정의

## 8. 코드 품질/배포/보안
- ESLint/Prettier 사용, 중복 코드 제거
- 유틸리티 함수는 lib/utils/에 통합
- 불필요한 변수/함수 제거
- 환경변수 노출 방지, XSS/CSRF/HTTPS 보안 적용

## 9. 접근성(A11y)/SEO
- 시맨틱 HTML, alt/ARIA 속성, 키보드 네비게이션 지원
- 색상 대비 준수(WCAG 2.1 AA)
- 메타데이터/JSON-LD/sitemap/robots/Open Graph/Twitter Card 설정

## 10. 커밋 메시지 (CRITICAL - TRAE 최신 적용)

### ⚠️ AI 에이전트 필수 지시사항
- **커밋 메시지 생성 시 반드시 한글로 작성합니다**
- **영어로 생성된 커밋 메시지는 자동으로 한글로 번역합니다**
- **커밋 메시지는 명확한 한글 설명을 포함해야 합니다**

### TRAE AI 에이전트 명령
```
당신은 한글 커밋 메시지를 생성하는 전문가입니다.
모든 커밋 메시지는 반드시 한글로 작성해야 합니다.
영어로 생성된 메시지는 즉시 한글로 변경하세요.
```

### 커밋 메시지 생성 규칙
1. **항상 한글로 작성**: feat, fix, style 등 타입 이후 한글 설명 필수
2. **타입 지정**: 변경 유형을 명확히 표시
3. **간결한 설명**: 한 줄로 무엇을 변경했는지 명확히 설명

### 커밋 타입 및 한글 예시
- `feat`: 새로운 기능 추가
  - 예: `feat: 포트폴리오 레이아웃 및 스타일링 개선`
- `fix`: 버그 수정
  - 예: `fix: 헤더 스크롤 애니메이션 버그 수정`
- `style`: 코드 스타일 변경
  - 예: `style: SCSS 변환 및 스타일 코드 정리`
- `refactor`: 코드 리팩토링
- `chore`: 빌드 설정, 패키지 관리
- `docs`: 문서 수정
- `design`: UI/UX 디자인 변경

### 금지사항
- 영어로 된 커밋 메시지 생성 금지
- 불명확한 설명 금지
- 타입 미지정 금지
