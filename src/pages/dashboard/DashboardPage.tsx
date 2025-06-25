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
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Comments',
      value: '8,251',
      change: '+8%',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Engagement Rate',
      value: '4.2%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Team Members',
      value: '12',
      change: '+1',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New post published',
      user: 'Sarah Chen',
      time: '2 minutes ago',
      type: 'post',
    },
    {
      id: 2,
      action: 'Comment responded to',
      user: 'Mike Johnson',
      time: '15 minutes ago',
      type: 'comment',
    },
    {
      id: 3,
      action: 'Post scheduled',
      user: 'Lisa Wang',
      time: '1 hour ago',
      type: 'schedule',
    },
    {
      id: 4,
      action: 'Analytics report generated',
      user: 'David Kim',
      time: '2 hours ago',
      type: 'analytics',
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your social media
          management.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div
            key={stat.title}
            className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity -> Now Live Posts */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Live Posts</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCreatePostModalOpen(true)}
              className="h-8 w-8"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <div className="space-y-4">
            {posts.map(post => (
              <div
                key={post.id}
                className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">
                    {post.author.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{post.author}</p>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {post.status.charAt(0).toUpperCase() +
                        post.status.slice(1)}
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
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap mt-1">
                        {post.content}
                      </p>
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post content"
                          className="mt-2 rounded-lg object-cover w-full max-h-60"
                        />
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">
                          {post.status === 'scheduled' && post.scheduledAt
                            ? `Scheduled for: ${new Date(
                                post.scheduledAt
                              ).toLocaleString()}`
                            : `Published on: ${new Date(
                                post.timestamp
                              ).toLocaleString()}`}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-red-100 hover:text-red-600"
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

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/app/posts')}
              className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <PenTool className="h-5 w-5 text-primary" />
              <span className="font-medium">Create New Post</span>
            </button>
            <button
              onClick={() => navigate('/app/schedule')}
              className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <Calendar className="h-5 w-5 text-primary" />
              <span className="font-medium">Schedule Post</span>
            </button>
            <button
              onClick={() => navigate('/app/analytics')}
              className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="font-medium">View Analytics</span>
            </button>
          </div>
        </div>
      </div>
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
