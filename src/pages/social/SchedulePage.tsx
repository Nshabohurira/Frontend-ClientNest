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
import { Calendar as CalendarIcon, Clock, Plus, Edit, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const scheduledPostsData = [
  {
    id: 1,
    title: "Weekend motivation post",
    content: "Start your weekend with positive energy! Here are 5 tips to make the most of your time off...",
    platform: "Instagram",
    scheduledFor: "2024-01-20T09:00:00Z",
    status: "scheduled",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Product update announcement",
    content: "We're excited to share the latest updates to our platform. New features include...",
    platform: "LinkedIn",
    scheduledFor: "2024-01-21T14:30:00Z",
    status: "scheduled",
  },
  {
    id: 3,
    title: "Industry news recap",
    content: "This week in tech: AI breakthroughs, startup funding rounds, and market trends...",
    platform: "Twitter",
    scheduledFor: "2024-01-22T11:15:00Z",
    status: "scheduled",
  },
];

type Post = (typeof scheduledPostsData)[0];

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [scheduledPosts, setScheduledPosts] = useState(scheduledPostsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(new Date());
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setScheduledDate(new Date());
    setSelectedFile(null);
    setEditingPost(null);
  };

  const handleOpenEditDialog = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setScheduledDate(new Date(post.scheduledFor));
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!title || !content || !scheduledDate) {
      alert("Please fill all fields.");
      return;
    }

    if (editingPost) {
      // Update existing post
      setScheduledPosts(
        scheduledPosts.map((post) =>
          post.id === editingPost.id
            ? {
                ...post,
                title,
                content,
                scheduledFor: scheduledDate.toISOString(),
                image: selectedFile ? URL.createObjectURL(selectedFile) : post.image,
              }
            : post
        )
      );
    } else {
      // Create new post
      const newPost = {
        id: Math.max(...scheduledPosts.map((p) => p.id)) + 1,
        title,
        content,
        platform: "Twitter", // Defaulting to Twitter
        scheduledFor: scheduledDate.toISOString(),
        status: "scheduled",
        image: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
      };
      setScheduledPosts([newPost, ...scheduledPosts]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    setScheduledPosts(scheduledPosts.filter((post) => post.id !== id));
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "publishing":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Schedule</h1>
          <p className="text-muted-foreground">
            Plan and schedule your social media posts
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
              Schedule Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Edit Scheduled Post" : "Schedule a new post"}
              </DialogTitle>
              <DialogDescription>
                {editingPost
                  ? "Make changes to your scheduled post."
                  : "Plan your content in advance."}
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
                  placeholder="What do you want to say?"
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !scheduledDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduledDate ? (
                        format(scheduledDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={setScheduledDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSubmit}>
                {editingPost ? "Save Changes" : "Schedule"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar and Timeline View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Widget */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5" />
              <h3 className="font-semibold">Calendar</h3>
            </div>
            {/* We will replace this simplified calendar later */}
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md border"
            />
          </div>
        </div>

        {/* Scheduled Posts */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <h3 className="font-semibold">Upcoming Posts</h3>
              <span className="text-sm text-muted-foreground">
                ({scheduledPosts.length} scheduled)
              </span>
            </div>

            {scheduledPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Post Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-3 h-3 rounded-full ${getPlatformColor(post.platform)}`}
                      />
                      <span className="text-sm font-medium">{post.platform}</span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(post.status)}`}
                      >
                        {post.status}
                      </span>
                    </div>

                    {/* Post Content */}
                    <h4 className="font-semibold mb-2">{post.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {post.content}
                    </p>

                    {/* Scheduled Time */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        Scheduled for{' '}
                        {new Date(post.scheduledFor).toLocaleDateString()}{' '}
                        at{' '}
                        {new Date(post.scheduledFor).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <img
                      src={post.image}
                      alt=""
                      className="w-16 h-16 rounded-lg object-cover ml-4"
                    />
                  )}
                </div>

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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
