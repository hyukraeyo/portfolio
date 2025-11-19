import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { createPost, updatePost, getPost } from '@/app/actions/posts';
import { formatTeamComposition, parseTeamComposition, type TeamMember } from '@/lib/team-roles';

export interface PostFormData {
  title: string;
  content: string;
  overview: string;
  work_period: string;
  team_composition: string[];
  role: string[];
  tech_stack: string[];
  main_contribution: string;
  achievements: string;
  reflection: string;
}

const initialFormData: PostFormData = {
  title: '',
  content: '',
  overview: '',
  work_period: '',
  team_composition: [],
  role: [''],
  tech_stack: [],
  main_contribution: '',
  achievements: '',
  reflection: '',
};

export function usePostForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<PostFormData>(initialFormData);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [loadingPost, setLoadingPost] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // role 문자열을 배열로 변환하는 헬퍼 함수
  const parseRoleToArray = (role: string | string[] | null | undefined): string[] => {
    if (!role) return [''];
    if (Array.isArray(role)) {
      const filtered = role.filter((r) => typeof r === 'string' && r.trim().length > 0);
      return filtered.length > 0 ? filtered : [''];
    }
    if (typeof role === 'string') {
      const parsed = role.split(',').map((r) => r.trim()).filter((r) => r.length > 0);
      return parsed.length > 0 ? parsed : [''];
    }
    return [''];
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) return;

    setIsEditMode(true);
    setPostId(id);
    setLoadingPost(true);
    setIsInitialLoad(true);

    getPost(id)
      .then((post) => {
        const teamCompositionArray = Array.isArray(post.team_composition)
          ? post.team_composition
          : [];
        const parsedMembers = parseTeamComposition(teamCompositionArray);

        setFormData({
          title: post.title || '',
          content: post.content || '',
          overview: post.overview || '',
          work_period: post.work_period || '',
          team_composition: teamCompositionArray,
          role: parseRoleToArray(post.role),
          tech_stack: Array.isArray(post.tech_stack) ? post.tech_stack : [],
          main_contribution: post.main_contribution || '',
          achievements: post.achievements || '',
          reflection: post.reflection || '',
        });

        setTeamMembers(parsedMembers);
        setIsInitialLoad(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.');
      })
      .finally(() => {
        setLoadingPost(false);
      });
  }, [searchParams]);

  useEffect(() => {
    if (isInitialLoad) return;
    const formatted = formatTeamComposition(teamMembers);
    setFormData((prev) => ({ ...prev, team_composition: formatted }));
  }, [teamMembers, isInitialLoad]);

  const handleFieldChange = (field: keyof PostFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formattedTeam = formatTeamComposition(teamMembers);
      const roles = formData.role.filter((r) => r.trim().length > 0);

      const postData = {
        ...formData,
        team_composition: formattedTeam.length > 0 ? formattedTeam : undefined,
        role: roles.length > 0 ? roles.join(', ') : undefined,
        tech_stack: formData.tech_stack.length > 0 ? formData.tech_stack : undefined,
        overview: formData.overview || undefined,
        work_period: formData.work_period || undefined,
        main_contribution: formData.main_contribution || undefined,
        achievements: formData.achievements || undefined,
        reflection: formData.reflection || undefined,
      };

      if (isEditMode && postId) {
        await updatePost(postId, postData, user?.id);
      } else {
        await createPost(postData, user?.id);
      }

      router.push('/board');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '게시글 작성에 실패했습니다.');
      setLoading(false);
    }
  };

  return {
    formData,
    teamMembers,
    setTeamMembers,
    loading,
    error,
    isEditMode,
    loadingPost,
    user,
    handleFieldChange,
    handleSubmit,
    router,
  };
}
