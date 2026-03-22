import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

const Stack = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('flex flex-col gap-4', className)} {...props} />
);

const HStack = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('flex items-center gap-4', className)} {...props} />
);

const Grid = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div className={cn('grid gap-4', className)} {...props} />
);

export { Stack, HStack, Grid };
