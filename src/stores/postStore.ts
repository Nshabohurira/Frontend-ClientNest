import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Post {
  id: number;
  content: string;
  author: string;
  timestamp: string;
  status: 'published' | 'scheduled';
  image?: string;
  scheduledAt?: string;
}

interface PostState {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'author' | 'timestamp'>) => void;
  updatePost: (
    postId: number,
    updates: { content?: string; image?: string }
  ) => void;
  deletePost: (postId: number) => void;
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
    }),
    {
      name: 'post-storage',
    }
  )
);

export default usePostStore;
