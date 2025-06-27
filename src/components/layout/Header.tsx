
import { Bell, Search, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search posts, comments, analytics..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="font-semibold"
        >
          BACK TO HOME
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{user?.name || user?.username}</p>
            <p className="text-xs text-muted-foreground">{user?.role || 'User'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
