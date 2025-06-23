import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";

type Post = (typeof postsData)[0];

const PostsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const postsData = [
    {
      id: 1,
      title: "Announcing our new product feature",
      content: "We're excited to share our latest innovation that will revolutionize how you manage your social media...",
      platform: "LinkedIn",
      status: "published",
      publishedAt: "2024-01-15T10:30:00Z",
      engagement: {
        views: 1247,
        likes: 84,
        comments: 23,
        shares: 12,
      },
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Team spotlight: Meet Sarah",
      content: "This week we're highlighting Sarah from our design team. She's been instrumental in creating...",
      platform: "Instagram",
      status: "scheduled",
      publishedAt: "2024-01-16T14:00:00Z",
      engagement: {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
      },
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c6b7?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      title: "Industry insights: 2024 trends",
      content: "Our analysis of the upcoming trends that will shape the industry in 2024...",
      platform: "Twitter",
      status: "draft",
      publishedAt: null,
      engagement: {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
      },
    },
  ];

  const [posts, setPosts] = useState(postsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setSelectedFile(null);
  };

  const handleOpenEditDialog = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!title || !content) {
      // Later, we can replace this with a more elegant toast notification
      alert("Please fill out both title and content.");
      return;
    }

    if (editingPost) {
      // Update existing post
      setPosts(
        posts.map((post) =>
          post.id === editingPost.id ? { ...post, title, content } : post
        )
      );
    } else {
      // Create new post
      const newPost = {
        id: Math.max(...posts.map((p) => p.id)) + 1, // Safer ID generation
        title,
        content,
        platform: "LinkedIn", // Defaulting to LinkedIn for new posts
        status: "published",
        publishedAt: new Date().toISOString(),
        engagement: { views: 0, likes: 0, comments: 0, shares: 0 },
        image: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
      };
      setPosts([newPost, ...posts]);
    }

    setIsDialogOpen(false);
    resetForm();
    setEditingPost(null);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    resetForm();
    setEditingPost(null);
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "LinkedIn":
        return "bg-blue-600";
      case "Instagram":
        return "bg-pink-600";
      case "Twitter":
        return "bg-black";
      case "Facebook":
        return "bg-blue-700";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-muted-foreground">
            Manage and monitor all your social media posts
          </p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              handleCancel();
            }
            setIsDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Edit Post" : "Create a new post"}
              </DialogTitle>
              <DialogDescription>
                {editingPost
                  ? "Make changes to your post here."
                  : "Craft your message and choose where to publish."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Post title"
                  className="col-span-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="What's on your mind?"
                  className="col-span-3"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="media" className="text-right">
                  Media
                </Label>
                <Input
                  id="media"
                  type="file"
                  className="col-span-3"
                  onChange={handleFileChange}
                />
              </div>
              {selectedFile && (
                <div className="col-start-2 col-span-3">
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedFile.name}
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSubmit}>
                {editingPost ? "Save Changes" : "Publish"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            {post.image && (
              <img
                src={post.image}
                alt=""
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-4 space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${getPlatformColor(post.platform)}`}
                  />
                  <span className="text-sm font-medium">{post.platform}</span>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${getStatusColor(post.status)}`}
                >
                  {post.status}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-semibold line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
                  {post.content}
                </p>
              </div>

              {/* Engagement Stats */}
              {post.status === "published" && (
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {post.engagement.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {post.engagement.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {post.engagement.comments}
                  </div>
                  <div className="flex items-center gap-1">
                    <Share className="h-4 w-4" />
                    {post.engagement.shares}
                  </div>
                </div>
              )}

              {/* Publish Date */}
              {post.publishedAt && (
                <p className="text-xs text-muted-foreground">
                  {post.status === "published" ? "Published" : "Scheduled for"}{" "}
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleOpenEditDialog(post)}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
