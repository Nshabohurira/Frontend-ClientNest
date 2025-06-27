import {
  BarChart3,
  Edit,
  Image as ImageIcon,
  MessageSquare,
  Paperclip,
  PenTool,
  Plus,
  Trash2,
  TrendingUp,
  Users,
  Calendar,
  Sparkles,
  Zap,
  Activity,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import CreatePostModal from '../../components/dashboard/CreatePostModal';
import SchedulePostModal from '../../components/dashboard/SchedulePostModal';
import usePostStore from '../../stores/postStore';
import { Post } from '../../stores/postStore';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const [isSchedulePostModalOpen, setSchedulePostModalOpen] = useState(false);
  const { posts, updatePost, deletePost } = usePostStore();

  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [editingFile, setEditingFile] = useState<File | null>(null);
  const [editingFilePreview, setEditingFilePreview] = useState<string | null>(
    null
  );
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const stats = [
    {
      title: 'Total Posts',
      value: '2,847',
      change: '+12%',
      icon: PenTool,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
    },
    {
      title: 'Comments',
      value: '8,251',
      change: '+8%',
      icon: MessageSquare,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
    },
    {
      title: 'Engagement Rate',
      value: '4.2%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      title: 'Team Members',
      value: '12',
      change: '+1',
      icon: Users,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
    },
  ];

  const handleEdit = (post: Post) => {
    setEditingPostId(post.id);
    setEditingContent(post.content);
    setEditingFilePreview(post.image || null);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditingContent('');
    setEditingFile(null);
    setEditingFilePreview(null);
  };

  const handleSaveEdit = (postId: number) => {
    if (!editingContent.trim() && !editingFile) return;
    const updates: { content?: string; image?: string } = {};
    if (editingContent.trim()) {
      updates.content = editingContent;
    }
    if (editingFilePreview !== null) {
      updates.image = editingFilePreview;
    }

    updatePost(postId, updates);
    handleCancelEdit();
  };

  const handleEditFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setEditingFile(file);
      setEditingFilePreview(URL.createObjectURL(file));
    }
  };

  const triggerEditFileSelect = (accept: string) => {
    editFileInputRef.current?.click();
  };

  const handleDelete = (postId: number) => {
    deletePost(postId);
    setPostToDelete(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header with gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 p-8 border border-primary/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Welcome back! Here's what's happening with your social media management.
          </p>
        </div>
      </div>

      {/* Enhanced Stats Grid with animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className={`group bg-white p-6 rounded-xl border-2 ${stat.borderColor} shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <p className="text-sm text-green-600 font-medium">
                    {stat.change} from last month
                  </p>
                </div>
              </div>
              <div className={`p-4 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid with enhanced styling */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Live Posts Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border-2 border-primary/10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Live Posts</h2>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <Button
              onClick={() => setCreatePostModalOpen(true)}
              className="hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Post
            </Button>
          </div>
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="group flex items-start gap-4 p-4 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 rounded-xl transition-all duration-300 border border-transparent hover:border-primary/20 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <span className="text-white text-sm font-bold">
                    {post.author.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-lg">{post.author}</p>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                    >
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                  </div>

                  {editingPostId === post.id ? (
                    <div className="mt-2">
                      <Textarea
                        value={editingContent}
                        onChange={e => setEditingContent(e.target.value)}
                        className="w-full"
                      />
                      {editingFilePreview && (
                        <img
                          src={editingFilePreview}
                          alt="Post content"
                          className="mt-2 rounded-lg object-cover w-full max-h-60"
                        />
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => triggerEditFileSelect('image/*')}
                          >
                            <ImageIcon className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              triggerEditFileSelect('image/*,video/*')
                            }
                          >
                            <Paperclip className="h-5 w-5" />
                          </Button>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(post.id)}
                          >
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-muted-foreground whitespace-pre-wrap mb-3 leading-relaxed">
                        {post.content}
                      </p>
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post content"
                          className="mt-3 rounded-xl object-cover w-full max-h-60 shadow-md hover:shadow-lg transition-shadow duration-200"
                        />
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                          {post.status === 'scheduled' && post.scheduledAt
                            ? `Scheduled for: ${new Date(
                                post.scheduledAt
                              ).toLocaleString()}`
                            : `Published on: ${new Date(
                                post.timestamp
                              ).toLocaleString()}`}
                        </p>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
                            onClick={() => setPostToDelete(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="bg-white p-8 rounded-xl border-2 border-accent/10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-semibold">Quick Actions</h2>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/app/posts')}
              className="w-full p-4 text-left border-2 border-primary/20 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 transition-all duration-300 flex items-center gap-4 group hover:scale-105 hover:shadow-lg"
            >
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                <PenTool className="h-6 w-6 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-lg block">Create New Post</span>
                <span className="text-sm text-muted-foreground">Share your thoughts</span>
              </div>
            </button>
            <button
              onClick={() => navigate('/app/schedule')}
              className="w-full p-4 text-left border-2 border-accent/20 rounded-xl hover:bg-gradient-to-r hover:from-accent/5 hover:to-accent/10 transition-all duration-300 flex items-center gap-4 group hover:scale-105 hover:shadow-lg"
            >
              <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors duration-200">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <div>
                <span className="font-semibold text-lg block">Schedule Post</span>
                <span className="text-sm text-muted-foreground">Plan ahead</span>
              </div>
            </button>
            <button
              onClick={() => navigate('/app/analytics')}
              className="w-full p-4 text-left border-2 border-emerald-200 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-100 transition-all duration-300 flex items-center gap-4 group hover:scale-105 hover:shadow-lg"
            >
              <div className="p-3 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-200">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <span className="font-semibold text-lg block">View Analytics</span>
                <span className="text-sm text-muted-foreground">Track performance</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Modals and hidden inputs */}
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setCreatePostModalOpen(false)}
      />
      <SchedulePostModal
        isOpen={isSchedulePostModalOpen}
        onClose={() => setSchedulePostModalOpen(false)}
      />

      <input
        type="file"
        ref={editFileInputRef}
        className="hidden"
        onChange={handleEditFileChange}
      />

      <AlertDialog
        open={postToDelete !== null}
        onOpenChange={() => setPostToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPostToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(postToDelete!)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DashboardPage;
