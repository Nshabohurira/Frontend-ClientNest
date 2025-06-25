import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SocialPlatform = 'Facebook' | 'Instagram' | 'X' | 'LinkedIn';

export interface Post {
  id: number;
  content: string;
  author: string;
  timestamp: string;
  status: 'published' | 'scheduled';
  platform: SocialPlatform;
  image?: string;
  scheduledAt?: string;
  likes?: number;
  dislikes?: number;
  comments?: number;
  shares?: number;
}

export type EngagementType = 'likes' | 'dislikes' | 'comments' | 'shares';

interface PostState {
  posts: Post[];
  addPost: (
    post: Omit<Post, 'id' | 'author' | 'timestamp'>
  ) => void;
  updatePost: (
    postId: number,
    updates: { content?: string; image?: string; platform?: SocialPlatform }
  ) => void;
  deletePost: (postId: number) => void;
  updatePostEngagement: (postId: number, type: EngagementType) => void;
}

const usePostStore = create<PostState>()(
  persist(
    set => ({
      posts: [
        {
          id: 1,
          content: 'Just launched our new feature! 🎉',
          author: 'Admin',
          timestamp: new Date().toISOString(),
          status: 'published',
          platform: 'Facebook',
          likes: 120,
          dislikes: 5,
          comments: 42,
          shares: 18,
        },
      ],
      addPost: post =>
        set(state => {
          const newPost: Post = {
            id:
              state.posts.length > 0
                ? Math.max(...state.posts.map(p => p.id)) + 1
                : 1,
            author: 'You', // In a real app, this would come from auth
            timestamp: new Date().toISOString(),
            ...post,
            likes: 0,
            dislikes: 0,
            comments: 0,
            shares: 0,
          };
          return { posts: [newPost, ...state.posts] };
        }),
      updatePost: (postId, updates) =>
        set(state => ({
          posts: state.posts.map(post =>
            post.id === postId ? { ...post, ...updates } : post
          ),
        })),
      deletePost: postId =>
        set(state => ({
          posts: state.posts.filter(post => post.id !== postId),
        })),
      updatePostEngagement: (postId, type) =>
        set(state => ({
          posts: state.posts.map(post =>
            post.id === postId
              ? { ...post, [type]: (post[type] ?? 0) + 1 }
              : post
          ),
        })),
    }),
    {
      name: 'post-storage',
    }
  )
);

export default usePostStore;
