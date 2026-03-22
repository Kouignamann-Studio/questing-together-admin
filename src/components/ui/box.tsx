import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

type BoxProps = ComponentProps<'div'>;

const Box = ({ className, ...props }: BoxProps) => (
  <div className={cn(className)} {...props} />
);

export { Box };
