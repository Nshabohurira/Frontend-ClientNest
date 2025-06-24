import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
} from "lucide-react";
import usePostStore from "@/stores/postStore";
import { Post } from "@/stores/postStore";
import CreatePostModal from "@/components/dashboard/CreatePostModal";

const PostsPage = () => {
  const { posts, updatePost, deletePost } = usePostStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [editingFile, setEditingFile] = useState<File | null>(null);
  const [editingFilePreview, setEditingFilePreview] = useState<string | null>(null);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (post: Post) => {
    setEditingPostId(post.id);
    setEditingContent(post.content);
    setEditingFilePreview(post.image || null);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditingContent("");
    setEditingFile(null);
    setEditingFilePreview(null);
  };

  const handleSaveEdit = (postId: number) => {
    const updates: { content?: string; image?: string } = {};
    if (editingContent) updates.content = editingContent;
    if (editingFilePreview) updates.image = editingFilePreview;

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
    (post) =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Button onClick={() => setCreateModalOpen(true)} className="flex items-center gap-2">
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-start gap-4">
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
                      post.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>

                {editingPostId === post.id ? (
                  <div className="mt-2">
                    <Textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="w-full"
                    />
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
                        {post.status === "scheduled"
                          ? `Scheduled for: ${new Date(
                              post.scheduledAt || ""
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

      <AlertDialog open={postToDelete !== null} onOpenChange={() => setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPostToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteConfirm(postToDelete!)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PostsPage;
