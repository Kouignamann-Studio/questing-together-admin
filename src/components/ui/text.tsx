import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

type HeadingProps = ComponentProps<'h1'> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
};

const Heading = ({ as: Tag = 'h1', className, ...props }: HeadingProps) => {
  const sizes = {
    h1: 'text-2xl font-bold tracking-tight',
    h2: 'text-xl font-semibold tracking-tight',
    h3: 'text-lg font-semibold',
    h4: 'text-base font-semibold',
  };
  return <Tag className={cn(sizes[Tag], className)} {...props} />;
};

type TextProps = ComponentProps<'p'> & {
  muted?: boolean;
  size?: 'xs' | 'sm' | 'base';
  italic?: boolean;
  mono?: boolean;
  as?: 'p' | 'span';
};

const Text = ({
  muted,
  size = 'base',
  italic,
  mono,
  as: Tag = 'p',
  className,
  ...props
}: TextProps) => (
  <Tag
    className={cn(
      size === 'xs' && 'text-xs',
      size === 'sm' && 'text-sm',
      muted && 'text-muted-foreground',
      italic && 'italic',
      mono && 'font-mono',
      className,
    )}
    {...props}
  />
);

const Label = ({ className, ...props }: ComponentProps<'span'>) => (
  <span
    className={cn('text-xs font-medium uppercase tracking-wide text-muted-foreground', className)}
    {...props}
  />
);

export { Heading, Text, Label };
