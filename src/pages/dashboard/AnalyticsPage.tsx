import { BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AnalyticsPage = () => {
  const analyticsData = {
    totalReach: 124567,
    totalEngagement: 8934,
    avgEngagementRate: 4.2,
    totalFollowers: 125000,
    monthlyGrowth: 15.3,
  };

  const weeklyData = [
    { day: 'Mon', posts: 3, engagement: 247, reach: 4521 },
    { day: 'Tue', posts: 2, engagement: 189, reach: 3842 },
    { day: 'Wed', posts: 4, engagement: 356, reach: 6123 },
    { day: 'Thu', posts: 1, engagement: 98, reach: 2156 },
    { day: 'Fri', posts: 3, engagement: 287, reach: 5234 },
    { day: 'Sat', posts: 2, engagement: 145, reach: 3098 },
    { day: 'Sun', posts: 1, engagement: 76, reach: 1876 },
  ];

  const topHashtags = [
    { tag: '#socialmedia', usage: 23, performance: 'high' },
    { tag: '#marketing', usage: 18, performance: 'high' },
    { tag: '#digitalmarketing', usage: 15, performance: 'medium' },
    { tag: '#branding', usage: 12, performance: 'high' },
    { tag: '#contentmarketing', usage: 10, performance: 'medium' },
  ];

  const contentTypes = [
    { type: 'Image Posts', count: 45, engagement: '4.8%' },
    { type: 'Video Posts', count: 23, engagement: '6.2%' },
    { type: 'Text Posts', count: 32, engagement: '3.1%' },
    { type: 'Carousel Posts', count: 18, engagement: '5.4%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Deep insights into your social media performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 days
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm font-medium">Total Reach</span>
          </div>
          <p className="text-2xl font-bold">
            {analyticsData.totalReach.toLocaleString()}
          </p>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />+{analyticsData.monthlyGrowth}%
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm font-medium">Engagement</span>
          </div>
          <p className="text-2xl font-bold">
            {analyticsData.totalEngagement.toLocaleString()}
          </p>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            +8.2%
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm font-medium">Avg. Rate</span>
          </div>
          <p className="text-2xl font-bold">
            {analyticsData.avgEngagementRate}%
          </p>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            +0.3%
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm font-medium">Followers</span>
          </div>
          <p className="text-2xl font-bold">
            {analyticsData.totalFollowers.toLocaleString()}
          </p>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            +2.1k
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm font-medium">Growth</span>
          </div>
          <p className="text-2xl font-bold">+{analyticsData.monthlyGrowth}%</p>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            +5.2%
          </p>
        </div>
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Weekly Performance</h2>
          <div className="space-y-3">
            {weeklyData.map(day => (
              <div
                key={day.day}
                className="flex items-center justify-between p-3 border rounded"
              >
                <span className="font-medium">{day.day}</span>
                <div className="flex gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{day.posts}</p>
                    <p className="text-muted-foreground">Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{day.engagement}</p>
                    <p className="text-muted-foreground">Engagement</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{day.reach.toLocaleString()}</p>
                    <p className="text-muted-foreground">Reach</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Hashtags */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Top Hashtags</h2>
          <div className="space-y-3">
            {topHashtags.map(hashtag => (
              <div
                key={hashtag.tag}
                className="flex items-center justify-between p-3 border rounded"
              >
                <div>
                  <span className="font-medium text-blue-600">
                    {hashtag.tag}
                  </span>
                  <p className="text-sm text-muted-foreground">
                    {hashtag.usage} uses
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    hashtag.performance === 'high'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {hashtag.performance}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Performance */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Content Type Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentTypes.map(content => (
            <div
              key={content.type}
              className="p-4 border rounded-lg text-center"
            >
              <h3 className="font-medium">{content.type}</h3>
              <p className="text-2xl font-bold mt-2">{content.count}</p>
              <p className="text-sm text-muted-foreground">posts</p>
              <p className="text-sm text-green-600 font-medium mt-1">
                {content.engagement} avg engagement
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
