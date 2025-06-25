import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Image, Smile, Paperclip, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import Lottie from 'lottie-react';
import successAnimation from '@/assets/success-animation.json';
import usePostStore from '@/stores/postStore';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PublishStatus = 'idle' | 'loading' | 'success';

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [postContent, setPostContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [publishStatus, setPublishStatus] = useState<PublishStatus>('idle');
  const addPost = usePostStore(state => state.addPost);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (publishStatus === 'success') {
      const timer = setTimeout(() => {
        onClose();
        setPublishStatus('idle');
        setPostContent('');
        setSelectedFile(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [publishStatus, onClose]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const triggerFileSelect = (accept: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = accept;
      fileInputRef.current.click();
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setPostContent(prevContent => prevContent + emojiData.emoji);
  };

  const handlePublish = () => {
    setPublishStatus('loading');
    setTimeout(() => {
      addPost({
        content: postContent,
        image: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
        status: 'published',
      });
      setPublishStatus('success');
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Craft a new post to engage your audience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="What's on your mind?"
            className="min-h-[120px]"
            value={postContent}
            onChange={e => setPostContent(e.target.value)}
          />
          {selectedFile && (
            <div className="text-sm text-muted-foreground">
              Attached: {selectedFile.name}
            </div>
          )}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => triggerFileSelect('image/*,video/*')}
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => triggerFileSelect('image/*')}
            >
              <Image className="h-5 w-5" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-0">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={publishStatus === 'loading'}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handlePublish}
            disabled={publishStatus === 'loading' || !postContent.trim()}
          >
            {publishStatus === 'loading' && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {publishStatus === 'loading' ? 'Publishing...' : 'Publish'}
          </Button>
        </DialogFooter>

        {publishStatus === 'success' && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <Lottie
              animationData={successAnimation}
              loop={false}
              style={{ width: 150, height: 150 }}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
