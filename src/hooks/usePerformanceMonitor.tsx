import { useEffect, useRef } from 'react';

interface PerformanceMonitorOptions {
  componentName?: string;
  logRenders?: boolean;
  logProps?: boolean;
  logRenderTime?: boolean;
}

export function usePerformanceMonitor(
  props: any = {},
  options: PerformanceMonitorOptions = {}
) {
  const {
    componentName = 'Component',
    logRenders = true,
    logProps = false,
    logRenderTime = false,
  } = options;

  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const currentTime = performance.now();
    const renderTime = currentTime - lastRenderTime.current;
    lastRenderTime.current = currentTime;

    if (logRenders) {
      console.log(
        `🔄 ${componentName} rendered (${renderCount.current} times)`
      );
    }

    if (logRenderTime) {
      console.log(`⏱️ ${componentName} render time: ${renderTime.toFixed(2)}ms`);
    }

    if (logProps) {
      console.log(`📦 ${componentName} props:`, props);
    }
  });

  return {
    renderCount: renderCount.current,
    logRenderCount: () => console.log(`${componentName} total renders: ${renderCount.current}`),
  };
}

// Hook for measuring expensive operations
export function usePerformanceTimer(operationName: string) {
  const startTime = useRef<number | null>(null);

  const startTimer = () => {
    startTime.current = performance.now();
  };

  const endTimer = () => {
    if (startTime.current) {
      const endTime = performance.now();
      const duration = endTime - startTime.current;
      console.log(`⏱️ ${operationName} took: ${duration.toFixed(2)}ms`);
      startTime.current = null;
      return duration;
    }
    return 0;
  };

  return { startTimer, endTimer };
}

// Hook for monitoring re-render causes
export function useRenderTracker(componentName: string, dependencies: any[]) {
  const prevDeps = useRef<any[]>([]);

  useEffect(() => {
    const changedDeps = dependencies.map((dep, index) => {
      const prevDep = prevDeps.current[index];
      const hasChanged = dep !== prevDep;
      
      if (hasChanged) {
        console.log(
          `🔄 ${componentName} re-rendered due to dependency ${index}:`,
          { from: prevDep, to: dep }
        );
      }
      
      return dep;
    });

    prevDeps.current = changedDeps;
  }, dependencies);
} 