# Supabase 설정 가이드

이 문서는 게시판 기능을 위한 Supabase 데이터베이스 설정 방법을 안내합니다.

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 접속하여 계정을 생성하거나 로그인합니다.
2. "New Project"를 클릭하여 새 프로젝트를 생성합니다.
3. 프로젝트 이름, 데이터베이스 비밀번호, 리전을 설정합니다.

## 2. 환경 변수 설정

Supabase 대시보드에서 프로젝트 설정 > API 메뉴로 이동하여 다음 정보를 확인합니다:

- **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`
- **anon public key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**중요**: 환경 변수를 변경한 후에는 개발 서버를 재시작해야 합니다.

## 3. 데이터베이스 스키마 생성

Supabase 대시보드의 SQL Editor로 이동하여 다음 SQL을 실행합니다:

```sql
-- posts 테이블 생성
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거 생성
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
```

## 4. Row Level Security (RLS) 정책 설정

보안을 위해 RLS를 활성화하고 정책을 설정합니다:

```sql
-- RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 게시글 조회 가능 (SELECT)
CREATE POLICY "게시글은 모든 사용자가 조회 가능"
  ON posts
  FOR SELECT
  USING (true);

-- 로그인한 사용자만 게시글 작성 가능 (INSERT)
CREATE POLICY "로그인한 사용자는 게시글 작성 가능"
  ON posts
  FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- 작성자만 자신의 게시글 수정 가능 (UPDATE)
CREATE POLICY "작성자는 자신의 게시글만 수정 가능"
  ON posts
  FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- 작성자만 자신의 게시글 삭제 가능 (DELETE)
CREATE POLICY "작성자는 자신의 게시글만 삭제 가능"
  ON posts
  FOR DELETE
  USING (auth.uid() = author_id);
```

## 5. 확인

SQL Editor에서 다음 쿼리를 실행하여 테이블과 정책이 올바르게 생성되었는지 확인합니다:

```sql
-- 테이블 확인
SELECT * FROM posts;

-- 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'posts';
```

## 6. 인증 설정 (선택사항)

Supabase 대시보드의 Authentication > Settings에서:

- 이메일 인증이 활성화되어 있는지 확인
- 필요시 소셜 로그인(OAuth) 설정

## 주의사항

- `author_id`는 `auth.users` 테이블의 `id`를 참조합니다.
- RLS 정책은 모든 사용자가 게시글을 조회할 수 있지만, 작성/수정/삭제는 작성자만 가능하도록 설정되어 있습니다.
- 프로덕션 환경에서는 추가적인 보안 검증을 고려하세요.

## 문제 해결

### RLS 정책이 작동하지 않는 경우

- Supabase 대시보드에서 RLS가 활성화되어 있는지 확인
- 정책이 올바르게 생성되었는지 확인
- 인증된 사용자의 세션이 올바른지 확인

### 서버 액션에서 세션을 읽지 못하는 경우

Next.js 15의 서버 액션에서 Supabase 세션을 읽지 못하는 경우가 있습니다. 이 경우:

- 클라이언트 컴포넌트에서 `useAuth()`를 통해 사용자 ID를 가져와서 서버 액션에 전달합니다.
- 서버 액션은 전달받은 사용자 ID를 사용하되, 서버에서도 한 번 더 검증합니다.
- 미들웨어(`middleware.ts`)가 세션을 갱신하도록 설정되어 있어야 합니다.

### 타입 생성 (선택사항)

Supabase CLI를 사용하여 타입을 자동 생성할 수 있습니다:

```bash
npx supabase gen types typescript --project-id your-project-id > types/supabase.ts
```

## 체크리스트

설정이 완료되었는지 확인하세요:

- [ ] Supabase 프로젝트 생성 완료
- [ ] `.env.local` 파일에 환경 변수 설정
- [ ] `posts` 테이블 생성 완료
- [ ] RLS 정책 설정 완료
- [ ] 개발 서버 재시작 완료
- [ ] `/check-connection` 페이지에서 연결 확인
- [ ] 로그인 후 게시글 작성 테스트
