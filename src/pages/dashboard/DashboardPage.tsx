import { BarChart3, MessageSquare, PenTool, TrendingUp, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Posts",
      value: "2,847",
      change: "+12%",
      icon: PenTool,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Comments",
      value: "8,251",
      change: "+8%",
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Engagement Rate",
      value: "4.2%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Team Members",
      value: "12",
      change: "+1",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New post published",
      user: "Sarah Chen",
      time: "2 minutes ago",
      type: "post",
    },
    {
      id: 2,
      action: "Comment responded to",
      user: "Mike Johnson",
      time: "15 minutes ago",
      type: "comment",
    },
    {
      id: 3,
      action: "Post scheduled",
      user: "Lisa Wang",
      time: "1 hour ago",
      type: "schedule",
    },
    {
      id: 4,
      action: "Analytics report generated",
      user: "David Kim",
      time: "2 hours ago",
      type: "analytics",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your social media management.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {activity.user.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    by {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/posts")}
              className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <PenTool className="h-5 w-5 text-primary" />
              <span className="font-medium">Create New Post</span>
            </button>
            <button
              onClick={() => navigate("/schedule")}
              className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <Calendar className="h-5 w-5 text-primary" />
              <span className="font-medium">Schedule Post</span>
            </button>
            <button
              onClick={() => navigate("/analytics")}
              className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="font-medium">View Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
