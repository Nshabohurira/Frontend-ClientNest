import { useState, useRef } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import usePostStore, { Post, SocialPlatform } from '@/stores/postStore';
import { format, isSameDay, startOfToday, compareAsc } from 'date-fns';
import {
  Edit,
  Trash2,
  Image as ImageIcon,
  Paperclip,
  Calendar as CalendarIcon,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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

const SchedulePage = () => {
  const { posts, addPost, updatePost, deletePost } = usePostStore();

  // State for the calendar and post lists
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('upcoming');

  // State for inline editing
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [editingPlatform, setEditingPlatform] =
    useState<SocialPlatform | null>(null);
  const [editingFile, setEditingFile] = useState<File | null>(null);
  const [editingFilePreview, setEditingFilePreview] = useState<string | null>(
    null
  );
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // State for deleting posts
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  // State for the "Schedule New" form
  const [newContent, setNewContent] = useState('');
  const [newDate, setNewDate] = useState<Date | undefined>(new Date());
  const [newTime, setNewTime] = useState('12:00');
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newPlatform, setNewPlatform] = useState<SocialPlatform>('Facebook');
  const newFileInputRef = useRef<HTMLInputElement>(null);
  const [isScheduling, setIsScheduling] = useState(false);

  const upcomingPosts = posts
    .filter(
      post =>
        post.status === 'scheduled' &&
        new Date(post.scheduledAt!) >= startOfToday()
    )
    .sort((a, b) =>
      compareAsc(new Date(a.scheduledAt!), new Date(b.scheduledAt!))
    );

  // Handlers for inline editing
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

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditingFile(e.target.files[0]);
      setEditingFilePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const triggerEditFileSelect = () => editFileInputRef.current?.click();

  // Handler for "Schedule New" form
  const handleNewFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewFile(e.target.files[0]);
    }
  };

  const triggerNewFileSelect = (accept: string) => {
    if (newFileInputRef.current) {
      newFileInputRef.current.accept = accept;
      newFileInputRef.current.click();
    }
  };

  const handleScheduleNew = () => {
    if (!newContent.trim() || !newDate) {
      toast.error('Please add content and select a date to schedule a post.');
      return;
    }
    setIsScheduling(true);

    // Simulate async operation
    setTimeout(() => {
      const [hours, minutes] = newTime.split(':').map(Number);
      const scheduledAt = new Date(newDate);
      scheduledAt.setHours(hours, minutes);

      addPost({
        content: newContent,
        status: 'scheduled',
        scheduledAt: scheduledAt.toISOString(),
        image: newFile ? URL.createObjectURL(newFile) : undefined,
        platform: newPlatform,
      });

      // Reset form
      setNewContent('');
      setNewFile(null);
      setNewDate(new Date());
      setNewTime('12:00');
      setIsScheduling(false);
      toast.success('Post scheduled successfully!');
      setActiveTab('upcoming');
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Schedule</h1>
        <p className="text-muted-foreground">
          A visual overview of your upcoming posts.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full"
            components={{
              DayContent: ({ date: dayDate }) => {
                const dailyPosts = upcomingPosts.filter(post =>
                  isSameDay(new Date(post.scheduledAt!), dayDate)
                );
                return (
                  <div className="relative h-full w-full">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      {format(dayDate, 'd')}
                    </span>
                    {dailyPosts.length > 0 && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                        {dailyPosts.slice(0, 3).map(post => (
                          <div
                            key={post.id}
                            className="h-1.5 w-1.5 rounded-full bg-blue-500"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              },
            }}
          />
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="create">Schedule New</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4 pt-4">
          {upcomingPosts.map(post => (
            <Card key={post.id}>
              <CardContent className="p-4">
                {editingPostId === post.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editingContent}
                      onChange={e => setEditingContent(e.target.value)}
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
                            id="r1-edit-schedule"
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
                            id="r2-edit-schedule"
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
                            id="r3-edit-schedule"
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
                            id="r4-edit-schedule"
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
                        alt="Preview"
                        className="h-24 w-24 object-cover rounded-md"
                      />
                    )}
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={triggerEditFileSelect}
                        >
                          <ImageIcon className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={triggerEditFileSelect}
                        >
                          <Paperclip className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                        <Button onClick={() => handleSaveEdit(post.id)}>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post media"
                          className="h-16 w-16 object-cover rounded-md"
                        />
                      )}
                      <div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Badge>{format(new Date(post.scheduledAt!), 'MMM d, p')}</Badge>
                            <PlatformIcon platform={post.platform} />
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEdit(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setPostToDelete(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="mt-2 text-sm text-muted-foreground">
                          {post.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="create" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule a New Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What do you want to share?"
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
              />
              <div className="space-y-2">
                <Label>Platform</Label>
                <RadioGroup
                  value={newPlatform}
                  className="flex gap-4"
                  onValueChange={value =>
                    setNewPlatform(value as SocialPlatform)
                  }
                >
                  <Label
                    className={`flex items-center gap-2 border p-2 rounded-md cursor-pointer ${
                      newPlatform === 'Facebook'
                        ? 'border-primary bg-primary/10'
                        : ''
                    }`}
                  >
                    <RadioGroupItem
                      value="Facebook"
                      id="r1-new"
                      className="sr-only"
                    />
                    <Facebook className="h-5 w-5 text-[#1877F2]" />
                    Facebook
                  </Label>
                  <Label
                    className={`flex items-center gap-2 border p-2 rounded-md cursor-pointer ${
                      newPlatform === 'Instagram'
                        ? 'border-primary bg-primary/10'
                        : ''
                    }`}
                  >
                    <RadioGroupItem
                      value="Instagram"
                      id="r2-new"
                      className="sr-only"
                    />
                    <Instagram className="h-5 w-5 text-[#E4405F]" />
                    Instagram
                  </Label>
                  <Label
                    className={`flex items-center gap-2 border p-2 rounded-md cursor-pointer ${
                      newPlatform === 'X' ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    <RadioGroupItem value="X" id="r3-new" className="sr-only" />
                    <PlatformIcon platform="X" />X
                  </Label>
                  <Label
                    className={`flex items-center gap-2 border p-2 rounded-md cursor-pointer ${
                      newPlatform === 'LinkedIn'
                        ? 'border-primary bg-primary/10'
                        : ''
                    }`}
                  >
                    <RadioGroupItem
                      value="LinkedIn"
                      id="r4-new"
                      className="sr-only"
                    />
                    <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                    LinkedIn
                  </Label>
                </RadioGroup>
              </div>

              {newFile && (
                <div className="text-sm text-muted-foreground">
                  Attached: {newFile.name}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={'outline'}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newDate ? (
                          format(newDate, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newDate}
                        onSelect={setNewDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    className="w-32"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => triggerNewFileSelect('image/*')}
                  >
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => triggerNewFileSelect('image/*,video/*')}
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                </div>
                <Button onClick={handleScheduleNew} disabled={isScheduling}>
                  {isScheduling ? 'Scheduling...' : 'Schedule'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <input
        type="file"
        ref={editFileInputRef}
        className="hidden"
        onChange={handleEditFileChange}
      />
      <input
        type="file"
        ref={newFileInputRef}
        className="hidden"
        onChange={handleNewFileChange}
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
            <AlertDialogAction onClick={() => deletePost(postToDelete!)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SchedulePage;
