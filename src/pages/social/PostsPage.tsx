import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import {
  Plus,
  Search,
  Filter,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Edit,
  Trash2,
  Image as ImageIcon,
  Paperclip,
  Facebook,
  Instagram,
  Linkedin,
  ThumbsDown,
  Share2,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import usePostStore from '@/stores/postStore';
import { Post, SocialPlatform } from '@/stores/postStore';
import CreatePostModal from '@/components/dashboard/CreatePostModal';

const PlatformIcon = ({ platform }: { platform: SocialPlatform }) => {
  switch (platform) {
    case 'Facebook':
      return <Facebook className="h-5 w-5 text-[#1877F2]" />;
    case 'Instagram':
      return <Instagram className="h-5 w-5 text-[#E4405F]" />;
    case 'X':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 1200 1227"
          fill="currentColor"
        >
          <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.163 519.284ZM569.165 687.828L521.697 619.934L112.682 44.14H312.311L604.313 501.7L651.781 569.595L1093.54 1179.49H893.91L569.165 687.828Z" />
        </svg>
      );
    case 'LinkedIn':
      return <Linkedin className="h-5 w-5 text-[#0A66C2]" />;
    default:
      return null;
  }
};

const PostsPage = () => {
  const { posts, updatePost, deletePost, updatePostEngagement } =
    usePostStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [editingPlatform, setEditingPlatform] =
    useState<SocialPlatform | null>(null);
  const [editingFile, setEditingFile] = useState<File | null>(null);
  const [editingFilePreview, setEditingFilePreview] = useState<string | null>(
    null
  );
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (post: Post) => {
    setEditingPostId(post.id);
    setEditingContent(post.content);
    setEditingPlatform(post.platform);
    setEditingFilePreview(post.image || null);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditingContent('');
    setEditingPlatform(null);
    setEditingFile(null);
    setEditingFilePreview(null);
  };

  const handleSaveEdit = (postId: number) => {
    const updates: {
      content?: string;
      image?: string;
      platform?: SocialPlatform;
    } = {};
    if (editingContent) updates.content = editingContent;
    if (editingFilePreview) updates.image = editingFilePreview;
    if (editingPlatform) updates.platform = editingPlatform;

    if (Object.keys(updates).length > 0) {
      updatePost(postId, updates);
    }
    handleCancelEdit();
  };

  const handleDeleteConfirm = (postId: number) => {
    deletePost(postId);
    setPostToDelete(null);
  };

  const handleEditFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setEditingFile(file);
      setEditingFilePreview(URL.createObjectURL(file));
    }
  };

  const triggerEditFileSelect = () => {
    editFileInputRef.current?.click();
  };

  const filteredPosts = posts.filter(
    post =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-muted-foreground">
            Manage and monitor all your social media posts
          </p>
        </div>
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Post
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            className="pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-6">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-lg border shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{post.author}</p>
                    <PlatformIcon platform={post.platform} />
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
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
                    <div className="space-y-2 mt-4">
                      <Label>Platform</Label>
                      <RadioGroup
                        value={editingPlatform ?? undefined}
                        className="flex gap-4"
                        onValueChange={value =>
                          setEditingPlatform(value as SocialPlatform)
                        }
                      >
                        <Label
                          className={`flex items-center gap-2 border p-2 rounded-md cursor-pointer ${
                            editingPlatform === 'Facebook'
                              ? 'border-primary bg-primary/10'
                              : ''
                          }`}
                        >
                          <RadioGroupItem
                            value="Facebook"
                            id="r1-edit"
                            className="sr-only"
                          />
                          <Facebook className="h-5 w-5 text-[#1877F2]" />
                          Facebook
                        </Label>
                        <Label
                          className={`flex items-center gap-2 border p-2 rounded-md cursor-pointer ${
                            editingPlatform === 'Instagram'
                              ? 'border-primary bg-primary/10'
                              : ''
                          }`}
                        >
                          <RadioGroupItem
                            value="Instagram"
                            id="r2-edit"
                            className="sr-only"
                          />
                          <Instagram className="h-5 w-5 text-[#E4405F]" />
                          Instagram
                        </Label>
                        <Label
                          className={`flex items-center gap-2 border p-2 rounded-md cursor-pointer ${
                            editingPlatform === 'X'
                              ? 'border-primary bg-primary/10'
                              : ''
                          }`}
                        >
                          <RadioGroupItem
                            value="X"
                            id="r3-edit"
                            className="sr-only"
                          />
                          <PlatformIcon platform="X" />X
                        </Label>
                        <Label
                          className={`flex items-center gap-2 border p-2 rounded-md cursor-pointer ${
                            editingPlatform === 'LinkedIn'
                              ? 'border-primary bg-primary/10'
                              : ''
                          }`}
                        >
                          <RadioGroupItem
                            value="LinkedIn"
                            id="r4-edit"
                            className="sr-only"
                          />
                          <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                          LinkedIn
                        </Label>
                      </RadioGroup>
                    </div>
                    {editingFilePreview && (
                      <img
                        src={editingFilePreview}
                        alt="Post preview"
                        className="mt-2 rounded-lg object-cover w-full max-h-60"
                      />
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => triggerEditFileSelect()}
                        >
                          <ImageIcon className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => triggerEditFileSelect()}
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
                    <div className="border-t my-4" />
                    <div className="flex items-center justify-between text-muted-foreground">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1.5"
                          onClick={() => updatePostEngagement(post.id, 'likes')}
                        >
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1.5"
                          onClick={() => updatePostEngagement(post.id, 'dislikes')}
                        >
                          <ThumbsDown className="h-4 w-4" />
                          <span>{post.dislikes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1.5"
                          onClick={() => updatePostEngagement(post.id, 'comments')}
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1.5"
                        onClick={() => updatePostEngagement(post.id, 'shares')}
                      >
                        <Share2 className="h-4 w-4" />
                        <span>{post.shares}</span>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      <input
        type="file"
        ref={editFileInputRef}
        className="hidden"
        onChange={handleEditFileChange}
        accept="image/*,video/*"
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
            <AlertDialogAction
              onClick={() => handleDeleteConfirm(postToDelete!)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PostsPage;
