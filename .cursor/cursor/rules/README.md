# Cursor Rules - Next.js 포트폴리오 사이트

이 디렉토리는 Next.js 포트폴리오 사이트 개발을 위한 모든 규칙을 포함합니다.

## 규칙 구조

규칙은 주제별로 분리되어 있으며, 각 파일은 `.mdc` 확장자와 frontmatter 메타데이터를 포함합니다:

- **[기본 설정](./01-basics.mdc)** - Next.js 버전, TypeScript, 프로젝트 구조
- **[컴포넌트](./02-components.mdc)** - Server/Client Components, 아키텍처
- **[성능 최적화](./03-performance.mdc)** - 이미지, 폰트, 번들 최적화
- **[데이터 페칭](./04-data-fetching.mdc)** - 데이터 페칭 패턴, 서버 액션
- **[라우팅 & 레이아웃](./05-routing.mdc)** - 라우팅, 레이아웃 패턴
- **[스타일링](./06-styling.mdc)** - SCSS, CSS Modules
- **[타입 안정성](./07-typescript.mdc)** - TypeScript 설정 및 사용법
- **[품질 & 최적화](./08-quality.mdc)** - 코드 품질, 배포, 보안
- **[접근성 & SEO](./09-a11y-seo.mdc)** - 접근성, SEO 최적화
- **[커밋 메시지](./10-commit.mdc)** - 한글 커밋 메시지 규칙

## 사용 방법

Cursor IDE는 이 디렉토리의 모든 `.mdc` 파일을 자동으로 읽어서 규칙으로 적용합니다. 각 파일의 frontmatter에 포함된 `globs` 패턴에 따라 특정 파일 타입에만 규칙이 적용됩니다.

## 규칙 업데이트

각 주제별 파일을 수정하여 규칙을 업데이트할 수 있습니다. 변경사항은 Cursor IDE가 자동으로 감지합니다.

## Frontmatter 메타데이터

각 `.mdc` 파일의 frontmatter에는 다음 정보가 포함됩니다:

- `description`: 규칙에 대한 설명
- `globs`: 규칙이 적용될 파일 패턴 배열
- `alwaysApply`: 항상 적용 여부 (true/false)

