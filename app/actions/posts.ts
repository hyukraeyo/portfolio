'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Post } from '@/types';
import type { Database } from '@/types/supabase';

type PostInsert = Database['public']['Tables']['posts']['Insert'];
type PostUpdate = Database['public']['Tables']['posts']['Update'];

// 헬퍼 함수: 사용자 인증 확인
async function getAuthenticatedUser(userId?: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  if (userId && user.id !== userId) {
    throw new Error('사용자 정보가 일치하지 않습니다.');
  }

  return user;
}

// 헬퍼 함수: 작성자 확인
async function verifyAuthor(postId: string, userId: string) {
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('author_id')
    .eq('id', postId)
    .single();

  if (!post || (post as { author_id: string }).author_id !== userId) {
    throw new Error('본인의 게시글만 수정/삭제할 수 있습니다.');
  }
}

// 헬퍼 함수: 배열 데이터 파싱
function parseArrayField(value: unknown): string[] | undefined {
  if (!value) return undefined;
  
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === 'string' && item.trim().length > 0);
  }
  
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((item) => typeof item === 'string' && item.trim().length > 0);
      }
    } catch {
      return undefined;
    }
  }
  
  return undefined;
}

export async function getPosts() {
  const supabase = await createClient();
  const { data, error } = await (supabase.from('posts') as any)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`게시글을 불러오는데 실패했습니다: ${error.message}`);
  }

  return (data || []).map((item: any) => ({
    ...item,
    team_composition: parseArrayField(item.team_composition),
    tech_stack: parseArrayField(item.tech_stack) ?? undefined,
    overview: item.overview ?? undefined,
    work_period: item.work_period ?? undefined,
    role: item.role ?? undefined,
    main_contribution: item.main_contribution ?? undefined,
    achievements: item.achievements ?? undefined,
    reflection: item.reflection ?? undefined,
  })) as Post[];
}

export async function getPost(id: string) {
  const supabase = await createClient();
  const { data, error } = await (supabase.from('posts') as any)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`게시글을 불러오는데 실패했습니다: ${error.message}`);
  }

  const post: Post = {
    ...data,
    team_composition: parseArrayField(data.team_composition),
    tech_stack: parseArrayField(data.tech_stack) ?? undefined,
    overview: data.overview ?? undefined,
    work_period: data.work_period ?? undefined,
    role: data.role ?? undefined,
    main_contribution: data.main_contribution ?? undefined,
    achievements: data.achievements ?? undefined,
    reflection: data.reflection ?? undefined,
  };

  return post;
}

interface PostData {
  title: string;
  content: string;
  overview?: string;
  work_period?: string;
  team_composition?: string[];
  role?: string;
  tech_stack?: string[];
  main_contribution?: string;
  achievements?: string;
  reflection?: string;
}

// 헬퍼 함수: PostData를 Supabase 형식으로 변환
function preparePostData(postData: PostData) {
  return {
    title: postData.title,
    content: postData.content,
    overview: postData.overview || null,
    work_period: postData.work_period || null,
    team_composition:
      postData.team_composition && postData.team_composition.length > 0
        ? postData.team_composition
        : null,
    role: postData.role || null,
    tech_stack:
      postData.tech_stack && postData.tech_stack.length > 0
        ? postData.tech_stack
        : null,
    main_contribution: postData.main_contribution || null,
    achievements: postData.achievements || null,
    reflection: postData.reflection || null,
  };
}

export async function createPost(postData: PostData, userId?: string) {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(userId);

  const insertData = {
    ...preparePostData(postData),
    author_id: user.id,
  };

  const { data, error } = await (supabase.from('posts') as any)
    .insert(insertData)
    .select()
    .single();

  if (error) {
    throw new Error(`게시글 작성에 실패했습니다: ${error.message}`);
  }

  revalidatePath('/board');
  return data as Post;
}

export async function updatePost(
  id: string,
  postData: PostData,
  userId?: string
) {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(userId);

  await verifyAuthor(id, user.id);

  const updateData = preparePostData(postData);

  const { data, error } = await (supabase.from('posts') as any)
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`게시글 수정에 실패했습니다: ${error.message}`);
  }

  revalidatePath('/board');
  revalidatePath(`/board/${id}`);
  return data as Post;
}

export async function deletePost(id: string, userId?: string) {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(userId);

  await verifyAuthor(id, user.id);

  const { error } = await (supabase.from('posts') as any).delete().eq('id', id);

  if (error) {
    throw new Error(`게시글 삭제에 실패했습니다: ${error.message}`);
  }

  revalidatePath('/board');
}
