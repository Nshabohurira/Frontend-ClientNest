import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

// Non-optimized component (will re-render on every parent render)
const NonOptimizedItem = ({ id, value, onUpdate }: { id: number; value: number; onUpdate: (id: number) => void }) => {
  usePerformanceMonitor({ id, value }, { componentName: `NonOptimizedItem-${id}` });
  
  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <span>Item {id}: {value}</span>
      <Button size="sm" onClick={() => onUpdate(id)}>
        Update
      </Button>
    </div>
  );
};

// Optimized component with React.memo
const OptimizedItem = React.memo<{ id: number; value: number; onUpdate: (id: number) => void }>(
  ({ id, value, onUpdate }) => {
    usePerformanceMonitor({ id, value }, { componentName: `OptimizedItem-${id}` });
    
    return (
      <div className="flex items-center justify-between p-2 border rounded">
        <span>Item {id}: {value}</span>
        <Button size="sm" onClick={() => onUpdate(id)}>
          Update
        </Button>
      </div>
    );
  }
);

OptimizedItem.displayName = 'OptimizedItem';

// Expensive calculation component (non-optimized)
const ExpensiveCalculation = ({ numbers }: { numbers: number[] }) => {
  usePerformanceMonitor({ numbers }, { componentName: 'ExpensiveCalculation' });
  
  // This calculation runs on every render
  const result = numbers.reduce((acc, num) => {
    // Simulate expensive operation
    let sum = 0;
    for (let i = 0; i < 1000; i++) {
      sum += Math.sqrt(num + i);
    }
    return acc + sum;
  }, 0);
  
  return (
    <div className="p-2 border rounded">
      <p>Expensive Result: {result.toFixed(2)}</p>
    </div>
  );
};

// Optimized expensive calculation with useMemo
const OptimizedExpensiveCalculation = ({ numbers }: { numbers: number[] }) => {
  usePerformanceMonitor({ numbers }, { componentName: 'OptimizedExpensiveCalculation' });
  
  // This calculation only runs when numbers change
  const result = useMemo(() => {
    return numbers.reduce((acc, num) => {
      // Simulate expensive operation
      let sum = 0;
      for (let i = 0; i < 1000; i++) {
        sum += Math.sqrt(num + i);
      }
      return acc + sum;
    }, 0);
  }, [numbers]);
  
  return (
    <div className="p-2 border rounded">
      <p>Optimized Result: {result.toFixed(2)}</p>
    </div>
  );
};

export function PerformanceComparison() {
  const [counter, setCounter] = useState(0);
  const [items, setItems] = useState([
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
  ]);
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);

  // Non-optimized handler (creates new function on every render)
  const handleUpdateNonOptimized = (id: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, value: item.value + 1 } : item
    ));
  };

  // Optimized handler with useCallback
  const handleUpdateOptimized = useCallback((id: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, value: item.value + 1 } : item
    ));
  }, []);

  // Memoized items to prevent unnecessary re-renders
  const memoizedItems = useMemo(() => items, [items]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Open the browser console to see render counts. Click "Force Re-render" to see the difference.
          </p>
          
          <div className="flex gap-4 mb-4">
            <Button onClick={() => setCounter(c => c + 1)}>
              Force Re-render (Counter: {counter})
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setNumbers(prev => [...prev, Math.floor(Math.random() * 100)])}
            >
              Add Number
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Component Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Non-optimized */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Non-Optimized Components
              <Badge variant="destructive">High Re-renders</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ExpensiveCalculation numbers={numbers} />
            {items.map(item => (
              <NonOptimizedItem
                key={item.id}
                id={item.id}
                value={item.value}
                onUpdate={handleUpdateNonOptimized}
              />
            ))}
          </CardContent>
        </Card>

        {/* Optimized */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Optimized Components
              <Badge variant="default">Low Re-renders</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <OptimizedExpensiveCalculation numbers={numbers} />
            {memoizedItems.map(item => (
              <OptimizedItem
                key={item.id}
                id={item.id}
                value={item.value}
                onUpdate={handleUpdateOptimized}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Optimization Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Non-Optimized:</strong> All components re-render when parent state changes</p>
            <p><strong>Optimized:</strong> Only components with changed props re-render</p>
            <p><strong>React.memo:</strong> Prevents re-renders when props are the same</p>
            <p><strong>useMemo:</strong> Caches expensive calculations</p>
            <p><strong>useCallback:</strong> Caches function references</p>
            <p><strong>Console Logs:</strong> Check browser console to see render differences</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 