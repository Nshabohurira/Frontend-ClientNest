import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import { useTheme } from '@/contexts/ThemeContext';

export function ContextExample() {
  const { state, setTheme, toggleSidebar, setSidebarOpen, addNotification, removeNotification } = useAppContext();
  const { theme, setTheme: setThemeMode, resolvedTheme } = useTheme();

  const handleAddNotification = () => {
    addNotification({
      type: 'success',
      title: 'Success!',
      message: 'This is a test notification from Context API',
    });
  };

  const handleRemoveNotification = (id: string) => {
    removeNotification(id);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Context API State Management Example</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Theme Controls */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Theme Management</h3>
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => setThemeMode('light')}
              >
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => setThemeMode('dark')}
              >
                Dark
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                onClick={() => setThemeMode('system')}
              >
                System
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Current theme: {theme} (resolved: {resolvedTheme})
            </p>
          </div>

          {/* Sidebar Controls */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Sidebar Controls</h3>
            <div className="flex gap-2">
              <Button onClick={toggleSidebar}>
                Toggle Sidebar
              </Button>
              <Button
                variant="outline"
                onClick={() => setSidebarOpen(!state.sidebarOpen)}
              >
                Set Sidebar {state.sidebarOpen ? 'Closed' : 'Open'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Sidebar is {state.sidebarOpen ? 'open' : 'closed'}
            </p>
          </div>

          {/* Notification Controls */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Notification Management</h3>
            <div className="flex gap-2">
              <Button onClick={handleAddNotification}>
                Add Notification
              </Button>
            </div>
          </div>

          {/* Current State Display */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Current State</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Loading:</span>
                <Badge variant={state.isLoading ? 'default' : 'secondary'}>
                  {state.isLoading ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">User:</span>
                <Badge variant={state.user ? 'default' : 'secondary'}>
                  {state.user ? state.user.name : 'Not logged in'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Notifications:</span>
                <Badge variant="outline">
                  {state.notifications.length}
                </Badge>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          {state.notifications.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <div className="space-y-2">
                {state.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRemoveNotification(notification.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 