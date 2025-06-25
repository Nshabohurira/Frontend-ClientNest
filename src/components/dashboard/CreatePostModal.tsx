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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Image, Smile, Paperclip, Loader2, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import Lottie from 'lottie-react';
import successAnimation from '@/assets/success-animation.json';
import usePostStore, { SocialPlatform } from '@/stores/postStore';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PublishStatus = 'idle' | 'loading' | 'success';

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [postContent, setPostContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPlatform, setSelectedPlatform] =
    useState<SocialPlatform>('Facebook');
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
        platform: selectedPlatform,
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
          <div className="space-y-2">
            <Label>Platform</Label>
            <RadioGroup
              defaultValue="Facebook"
              className="flex gap-4"
              onValueChange={value =>
                setSelectedPlatform(value as SocialPlatform)
              }
            >
              <Label
                className={`flex items-center gap-2 border p-2 rounded-md cursor-pointer ${
                  selectedPlatform === 'Facebook'
                    ? 'border-primary bg-primary/10'
                    : ''
                }`}
              >
                <RadioGroupItem value="Facebook" id="r1" className="sr-only" />
                <Facebook className="h-5 w-5 text-[#1877F2]" />
                Facebook
              </Label>
              <Label
                className={`flex items-center gap-2 border p-2 rounded-md cursor-pointer ${
                  selectedPlatform === 'Instagram'
                    ? 'border-primary bg-primary/10'
                    : ''
                }`}
              >
                <RadioGroupItem
                  value="Instagram"
                  id="r2"
                  className="sr-only"
                />
                <Instagram className="h-5 w-5 text-[#E4405F]" />
                Instagram
              </Label>
              <Label
                className={`flex items-center gap-2 border p-2 rounded-md cursor-pointer ${
                  selectedPlatform === 'X' ? 'border-primary bg-primary/10' : ''
                }`}
              >
                <RadioGroupItem value="X" id="r3" className="sr-only" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 1200 1227"
                  fill="none"
                >
                  <path
                    d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.163 519.284ZM569.165 687.828L521.697 619.934L112.682 44.14H312.311L604.313 501.7L651.781 569.595L1093.54 1179.49H893.91L569.165 687.828Z"
                    fill="currentColor"
                  />
                </svg>
                X
              </Label>
              <Label
                className={`flex items-center gap-2 border p-2 rounded-md cursor-pointer ${
                  selectedPlatform === 'LinkedIn'
                    ? 'border-primary bg-primary/10'
                    : ''
                }`}
              >
                <RadioGroupItem value="LinkedIn" id="r4" className="sr-only" />
                <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                LinkedIn
              </Label>
            </RadioGroup>
          </div>
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
