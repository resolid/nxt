import { __DEV__, isString } from '@resolid/nxt-utils';
import type { SVGAttributes } from 'react';

type IconSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type IconProps = SVGAttributes<SVGElement> & { size?: number | string | IconSizes };

const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
};

export const Icon = (props: IconProps) => {
  const {
    fill = 'none',
    viewBox = '1 1 22 22',
    stroke = 'currentColor',
    strokeWidth = 2,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    children,
    size = 'md',
    width,
    height,
    ...rest
  } = props;

  const sizeValue =
    isString(size) && ['xs', 'sm', 'md', 'lg', 'xl'].includes(size) ? iconSizes[size as IconSizes] : size;

  return (
    <svg
      fill={fill}
      width={width ?? sizeValue}
      height={height ?? sizeValue}
      viewBox={viewBox}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
    </svg>
  );
};

if (__DEV__) {
  Icon.displayName = 'VisuallyHidden';
}
