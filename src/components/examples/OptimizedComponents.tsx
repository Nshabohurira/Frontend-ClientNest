import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/contexts/AppContext';

// 1. Memoized Component with React.memo
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UserCard = React.memo<UserCardProps>(({ user, onEdit, onDelete }) => {
  console.log(`UserCard rendered for: ${user.name}`); // Performance monitoring

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <Badge variant="outline">{user.role}</Badge>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => onEdit(user.id)}>
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(user.id)}>
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

UserCard.displayName = 'UserCard';

// 2. Memoized List Component
interface UserListProps {
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
  }>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UserList = React.memo<UserListProps>(({ users, onEdit, onDelete }) => {
  console.log('UserList rendered'); // Performance monitoring

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
});

UserList.displayName = 'UserList';

// 3. Memoized Data Processing Component
interface DataProcessorProps {
  data: number[];
  threshold: number;
}

const DataProcessor = React.memo<DataProcessorProps>(({ data, threshold }) => {
  // useMemo for expensive calculations
  const processedData = useMemo(() => {
    console.log('Processing data...'); // Performance monitoring
    return data
      .filter(num => num > threshold)
      .map(num => num * 2)
      .sort((a, b) => a - b);
  }, [data, threshold]);

  // useMemo for derived state
  const statistics = useMemo(() => {
    if (processedData.length === 0) return null;
    
    const sum = processedData.reduce((acc, num) => acc + num, 0);
    const average = sum / processedData.length;
    const max = Math.max(...processedData);
    const min = Math.min(...processedData);
    
    return { sum, average, max, min };
  }, [processedData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Processing Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>Processed {processedData.length} items</p>
          {statistics && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Sum: {statistics.sum.toFixed(2)}</p>
                <p className="text-sm font-medium">Average: {statistics.average.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Max: {statistics.max}</p>
                <p className="text-sm font-medium">Min: {statistics.min}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

DataProcessor.displayName = 'DataProcessor';

// 4. Main Component with Performance Optimizations
export function OptimizedComponents() {
  const { state, addNotification } = useAppContext();
  const [users, setUsers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
  ]);
  
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [threshold, setThreshold] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  // useCallback for event handlers to prevent unnecessary re-renders
  const handleEditUser = useCallback((id: string) => {
    addNotification({
      type: 'info',
      title: 'Edit User',
      message: `Editing user with ID: ${id}`,
    });
  }, [addNotification]);

  const handleDeleteUser = useCallback((id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    addNotification({
      type: 'success',
      title: 'User Deleted',
      message: `User with ID: ${id} has been deleted`,
    });
  }, [addNotification]);

  // useMemo for filtered users
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // useMemo for expensive data generation
  const generatedData = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => Math.floor(Math.random() * 100));
  }, []); // Empty dependency array - only runs once

  // Performance monitoring
  useEffect(() => {
    console.log('OptimizedComponents rendered');
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Optimization Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Open the browser console to see performance monitoring logs.
          </p>
        </CardContent>
      </Card>

      {/* User Management Section */}
      <Card>
        <CardHeader>
          <CardTitle>User Management (Memoized)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <UserList
            users={filteredUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </CardContent>
      </Card>

      {/* Data Processing Section */}
      <Card>
        <CardHeader>
          <CardTitle>Data Processing (Memoized)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium">Threshold:</label>
            <Input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-24"
            />
            <Button
              onClick={() => setData(generatedData)}
              variant="outline"
            >
              Generate New Data
            </Button>
          </div>
          <DataProcessor data={data} threshold={threshold} />
        </CardContent>
      </Card>

      {/* Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Optimization Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>React.memo:</strong> Prevents re-renders when props haven't changed</p>
            <p><strong>useMemo:</strong> Memoizes expensive calculations</p>
            <p><strong>useCallback:</strong> Memoizes functions to prevent child re-renders</p>
            <p><strong>Key Props:</strong> Always use stable keys for lists</p>
            <p><strong>Console Logs:</strong> Check browser console for render tracking</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 