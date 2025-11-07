'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Post } from '@/types';

// 헬퍼 함수: 사용자 인증 확인
async function getAuthenticatedUser(userId?: string) {
  const supabase = await createClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  let user = session?.user;
  
  if (!user) {
    const { data: { user: userFromGetUser }, error } = await supabase.auth.getUser();
    if (error || !userFromGetUser) {
      throw new Error('로그인이 필요합니다. 세션을 확인할 수 없습니다.');
    }
    user = userFromGetUser;
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

  if (!post || post.author_id !== userId) {
    throw new Error('본인의 게시글만 수정/삭제할 수 있습니다.');
  }
}

export async function getPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`게시글을 불러오는데 실패했습니다: ${error.message}`);
  }

  return data as Post[];
}

export async function getPost(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`게시글을 불러오는데 실패했습니다: ${error.message}`);
  }

  return data as Post;
}

export async function createPost(title: string, content: string, userId?: string) {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(userId);

  const { data, error } = await supabase
    .from('posts')
    .insert({ title, content, author_id: user.id })
    .select()
    .single();

  if (error) {
    console.error('Create post error:', error);
    throw new Error(`게시글 작성에 실패했습니다: ${error.message}`);
  }

  revalidatePath('/board');
  return data;
}

export async function updatePost(id: string, title: string, content: string, userId?: string) {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(userId);
  
  await verifyAuthor(id, user.id);

  const { data, error } = await supabase
    .from('posts')
    .update({ title, content })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`게시글 수정에 실패했습니다: ${error.message}`);
  }

  revalidatePath('/board');
  revalidatePath(`/board/${id}`);
  return data;
}

export async function deletePost(id: string, userId?: string) {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(userId);
  
  await verifyAuthor(id, user.id);

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`게시글 삭제에 실패했습니다: ${error.message}`);
  }

  revalidatePath('/board');
}

