import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  MessageSquare,
} from 'lucide-react';

const OverviewPage = () => {
  const performanceMetrics = [
    {
      title: 'Total Reach',
      value: '124,567',
      change: '+15.3%',
      trend: 'up',
      icon: Eye,
    },
    {
      title: 'Engagement Rate',
      value: '4.2%',
      change: '+0.8%',
      trend: 'up',
      icon: Heart,
    },
    {
      title: 'Followers Growth',
      value: '+2,847',
      change: '+12.4%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Comments',
      value: '1,234',
      change: '-2.1%',
      trend: 'down',
      icon: MessageSquare,
    },
  ];

  const platformStats = [
    {
      platform: 'LinkedIn',
      followers: '45.2k',
      growth: '+8.3%',
      engagement: '5.7%',
      color: 'bg-blue-600',
    },
    {
      platform: 'Instagram',
      followers: '32.1k',
      growth: '+12.1%',
      engagement: '3.8%',
      color: 'bg-pink-600',
    },
    {
      platform: 'Twitter',
      followers: '28.7k',
      growth: '+6.2%',
      engagement: '2.9%',
      color: 'bg-black',
    },
    {
      platform: 'Facebook',
      followers: '18.9k',
      growth: '+4.5%',
      engagement: '4.1%',
      color: 'bg-blue-700',
    },
  ];

  const topPosts = [
    {
      id: 1,
      title: 'New product launch announcement',
      platform: 'LinkedIn',
      engagement: 847,
      reach: 15420,
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Behind the scenes: Team collaboration',
      platform: 'Instagram',
      engagement: 612,
      reach: 12350,
      date: '2024-01-14',
    },
    {
      id: 3,
      title: 'Industry insights and trends',
      platform: 'Twitter',
      engagement: 423,
      reach: 8760,
      date: '2024-01-13',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Overview</h1>
        <p className="text-muted-foreground">
          Comprehensive view of your social media performance
        </p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map(metric => (
          <div
            key={metric.title}
            className="bg-white p-6 rounded-lg border shadow-sm"
          >
            <div className="flex items-center justify-between">
              <metric.icon className="h-8 w-8 text-muted-foreground" />
              <div
                className={`flex items-center gap-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {metric.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Platform Performance</h2>
          <div className="space-y-4">
            {platformStats.map(platform => (
              <div
                key={platform.platform}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                  <span className="font-medium">{platform.platform}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{platform.followers}</p>
                    <p className="text-muted-foreground">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-green-600">
                      {platform.growth}
                    </p>
                    <p className="text-muted-foreground">Growth</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{platform.engagement}</p>
                    <p className="text-muted-foreground">Engagement</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Posts */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Top Performing Posts</h2>
          <div className="space-y-4">
            {topPosts.map((post, index) => (
              <div
                key={post.id}
                className="flex items-start gap-3 p-3 border rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-1">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {post.platform}
                  </p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{post.engagement} engagements</span>
                    <span>{post.reach.toLocaleString()} reach</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
