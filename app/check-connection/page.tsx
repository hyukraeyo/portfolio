import { checkSupabaseConnection } from '@/app/actions/check-connection';
import styles from './check.module.scss';

export default async function CheckConnectionPage() {
  const result = await checkSupabaseConnection();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Supabase 연결 상태 확인</h1>
      
      <div className={styles.status}>
        <div className={styles.item}>
          <span className={styles.label}>연결 상태:</span>
          <span className={`${styles.value} ${result.connected ? styles.success : styles.error}`}>
            {result.connected ? '✓ 연결됨' : '✗ 연결 안 됨'}
          </span>
        </div>
        
        <div className={styles.item}>
          <span className={styles.label}>URL:</span>
          <span className={styles.value}>{result.url}</span>
        </div>
        
        <div className={styles.item}>
          <span className={styles.label}>API Key:</span>
          <span className={styles.value}>{result.key}</span>
        </div>

        {result.hasSession !== undefined && (
          <div className={styles.item}>
            <span className={styles.label}>세션:</span>
            <span className={styles.value}>
              {result.hasSession ? '✓ 로그인됨' : '✗ 로그인 안 됨'}
            </span>
          </div>
        )}

        {result.userId && (
          <div className={styles.item}>
            <span className={styles.label}>사용자 ID:</span>
            <span className={styles.value}>{result.userId}</span>
          </div>
        )}

        {result.error && (
          <div className={styles.errorBox}>
            <strong>오류:</strong> {result.error}
          </div>
        )}
      </div>

      {!result.connected && (
        <div className={styles.instructions}>
          <h2>설정 방법</h2>
          <ol>
            <li>프로젝트 루트에 <code>.env.local</code> 파일을 생성하세요.</li>
            <li>다음 내용을 추가하세요:
              <pre>
{`NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`}
              </pre>
            </li>
            <li>Supabase 대시보드에서 프로젝트 설정 &gt; API 메뉴로 이동하여 값을 확인하세요.</li>
            <li>개발 서버를 재시작하세요 (<code>npm run dev</code>).</li>
          </ol>
        </div>
      )}
    </div>
  );
}

