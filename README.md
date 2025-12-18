# Portfolio Site

Next.js로 만든 포트폴리오 사이트입니다.

## 기술 스택

- **Next.js 15+** - App Router
- **React 19+**
- **TypeScript**
- **Tailwind CSS**

## 시작하기

### 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
portfolio/
├── app/              # App Router 디렉토리
│   ├── layout.tsx   # 루트 레이아웃
│   ├── page.tsx     # 홈 페이지
│   ├── globals.css  # 전역 스타일
│   ├── loading.tsx  # 로딩 UI
│   ├── error.tsx    # 에러 UI
│   └── not-found.tsx # 404 페이지
├── components/       # 재사용 가능한 컴포넌트
├── lib/             # 유틸리티 함수 및 헬퍼
├── public/          # 정적 파일
└── cursor/          # Cursor IDE 규칙
```

## 주요 기능

- Server Components 기본 사용
- TypeScript 타입 안정성
- Tailwind CSS 스타일링
- 반응형 디자인
- SEO 최적화
# Auto-deploy trigger
