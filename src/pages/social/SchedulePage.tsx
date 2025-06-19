
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, Edit, Trash2 } from "lucide-react";

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const scheduledPosts = [
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
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Schedule Post
        </Button>
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
            {/* Simplified calendar - in a real app, you'd use a proper calendar component */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">January 2024</div>
              <div className="grid grid-cols-7 gap-1 text-sm">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div key={day} className="text-center font-medium p-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i + 1}
                    className={`text-center p-2 hover:bg-gray-100 rounded cursor-pointer ${
                      i + 1 === 20 || i + 1 === 21 || i + 1 === 22
                        ? 'bg-blue-100 text-blue-600 font-medium'
                        : ''
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
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
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
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
