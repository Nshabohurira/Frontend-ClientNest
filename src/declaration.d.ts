declare module '@radix-ui/react-slot' {
  import * as React from 'react';
  export const Slot: React.FC<React.PropsWithChildren<{}>>;
}

declare module 'class-variance-authority' {
  export function cva(...args: any[]): any;
  export type VariantProps<T> = any;
}
