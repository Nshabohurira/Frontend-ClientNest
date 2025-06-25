import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  MessageCircle,
  Heart,
  Reply,
  MoreHorizontal,
} from 'lucide-react';

const CommentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const comments = [
    {
      id: 1,
      postTitle: 'Announcing our new product feature',
      content:
        'This is exactly what we needed! Great work on the implementation.',
      author: 'Sarah Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b332c6b7?w=40&h=40&fit=crop&crop=face',
      platform: 'LinkedIn',
      timestamp: '2024-01-15T11:30:00Z',
      likes: 12,
      replies: 3,
      sentiment: 'positive',
    },
    {
      id: 2,
      postTitle: 'Team spotlight: Meet Sarah',
      content: 'Love seeing the team behind the scenes! Sarah seems amazing.',
      author: 'Mike Chen',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      platform: 'Instagram',
      timestamp: '2024-01-15T09:15:00Z',
      likes: 8,
      replies: 1,
      sentiment: 'positive',
    },
    {
      id: 3,
      postTitle: 'Industry insights: 2024 trends',
      content:
        'Interesting points, but I think you missed the impact of AI on customer service.',
      author: 'Alex Rivera',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      platform: 'Twitter',
      timestamp: '2024-01-14T16:45:00Z',
      likes: 5,
      replies: 2,
      sentiment: 'neutral',
    },
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      case 'neutral':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LinkedIn':
        return 'bg-blue-600';
      case 'Instagram':
        return 'bg-pink-600';
      case 'Twitter':
        return 'bg-black';
      case 'Facebook':
        return 'bg-blue-700';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Comments</h1>
          <p className="text-muted-foreground">
            Monitor and respond to comments across all platforms
          </p>
        </div>
        <Button variant="outline">Bulk Actions</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search comments..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map(comment => (
          <div
            key={comment.id}
            className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            {/* Comment Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{comment.author}</h4>
                    <div
                      className={`w-3 h-3 rounded-full ${getPlatformColor(comment.platform)}`}
                    />
                    <span className="text-sm text-muted-foreground">
                      {comment.platform}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    On: {comment.postTitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm ${getSentimentColor(comment.sentiment)}`}
                >
                  {comment.sentiment}
                </span>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Comment Content */}
            <p className="text-gray-700 mb-4">{comment.content}</p>

            {/* Comment Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {comment.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {comment.replies} replies
                </div>
                <span>{new Date(comment.timestamp).toLocaleDateString()}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Reply className="h-4 w-4" />
                Reply
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsPage;
