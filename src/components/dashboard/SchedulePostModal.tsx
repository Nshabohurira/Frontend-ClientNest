import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Calendar as CalendarIcon,
  Loader2,
  Paperclip,
  Image as ImageIcon,
} from 'lucide-react';
import { format } from 'date-fns';
import { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import successAnimation from '@/assets/success-animation.json';
import usePostStore from '@/stores/postStore';

interface SchedulePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ScheduleStatus = 'idle' | 'loading' | 'success';

const SchedulePostModal = ({ isOpen, onClose }: SchedulePostModalProps) => {
  const [content, setContent] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('12:00');
  const [status, setStatus] = useState<ScheduleStatus>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addPost = usePostStore(state => state.addPost);

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        onClose();
        setStatus('idle');
        setContent('');
        setSelectedFile(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  const handleSchedule = () => {
    if (!date || !content.trim()) return;

    setStatus('loading');

    const [hours, minutes] = time.split(':').map(Number);
    const scheduledAt = new Date(date);
    scheduledAt.setHours(hours, minutes);

    setTimeout(() => {
      addPost({
        content,
        status: 'scheduled',
        scheduledAt: scheduledAt.toISOString(),
        image: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
      });
      setStatus('success');
    }, 1500);
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Post</DialogTitle>
          <DialogDescription>Plan your content in advance.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="What would you like to schedule?"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="min-h-[120px]"
          />
          {selectedFile && (
            <div className="text-sm text-muted-foreground">
              Attached: {selectedFile.name}
            </div>
          )}
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => triggerFileSelect('image/*')}
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => triggerFileSelect('image/*,video/*')}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 ml-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={'outline'} className="justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div>
                <Label htmlFor="time" className="sr-only">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={status === 'loading'}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSchedule}
            disabled={status === 'loading' || !content.trim()}
          >
            {status === 'loading' && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {status === 'loading' ? 'Scheduling...' : 'Schedule Post'}
          </Button>
        </DialogFooter>

        {status === 'success' && (
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

export default SchedulePostModal;
