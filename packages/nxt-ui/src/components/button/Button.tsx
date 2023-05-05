import { __DEV__, cx, dataAttr } from '@resolid/nxt-utils';
import type { ElementType } from 'react';
import { useCallback, useState } from 'react';
import { useMergedRefs } from '../../hooks';
import { polymorphicComponent } from '../../primitives';
import { buttonStyles } from './Button.style';
import { useButtonGroup, type ButtonBaseProps } from './ButtonGroupContext';
import { ButtonSpinner } from './ButtonSpinner';

export type ButtonProps = ButtonBaseProps & {
  /**
   * Html Type
   * @default 'button'
   */
  type?: 'submit' | 'reset' | 'button';

  /**
   * Active
   * @default false
   */
  active?: boolean;

  /**
   * Loading
   * @default false
   */
  loading?: boolean;

  /**
   * Loading text
   */
  loadingText?: string;

  /**
   * Full Width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Spinner
   */
  spinner?: JSX.Element;

  /**
   * Spinner Placement
   * @default 'start'
   */
  spinnerPlacement?: 'start' | 'end';
};

const useButtonType = (value?: ElementType) => {
  const [isButton, setIsButton] = useState(!value);

  const refCallback = useCallback((node: HTMLElement | null) => {
    if (!node) {
      return;
    }

    setIsButton(node.tagName === 'BUTTON');
  }, []);

  const type = isButton ? 'button' : undefined;

  return { ref: refCallback, type } as const;
};

export const Button = polymorphicComponent<'button', ButtonProps>((props, ref) => {
  const group = useButtonGroup();

  const {
    as: Component = 'button',
    className,
    children,
    type = 'button',
    active = false,
    disabled = group?.disabled ?? false,
    loading = false,
    loadingText,
    fullWidth = false,
    spinner,
    spinnerPlacement = 'start',
    size = group?.size ?? 'md',
    variant = group?.variant ?? 'solid',
    color = group?.color ?? 'primary',
    ...rest
  } = props;

  const { ref: _ref, type: defaultType } = useButtonType(Component);

  const refs = useMergedRefs(ref, _ref);

  return (
    <Component
      className={cx(
        buttonStyles({ size, variant, color, disabled: disabled || loading, active }),
        fullWidth ? 'w-full' : 'w-auto',
        group
          ? group.vertical
            ? 'first:rounded-t last:rounded-b border-y-[0.5px] first:border-t last:border-b'
            : 'first:rounded-s last:rounded-e border-x-[0.5px] first:border-s last:border-e'
          : 'rounded',
        className
      )}
      disabled={disabled || loading}
      type={type || defaultType}
      data-active={dataAttr(active)}
      ref={refs}
      {...rest}
    >
      {loading && spinnerPlacement === 'start' && (
        <ButtonSpinner size={size} label={loadingText} placement="start">
          {spinner}
        </ButtonSpinner>
      )}

      {loading ? loadingText || <span className={'opacity-0'}>{children}</span> : children}

      {loading && spinnerPlacement === 'end' && (
        <ButtonSpinner size={size} label={loadingText} placement="end">
          {spinner}
        </ButtonSpinner>
      )}
    </Component>
  );
});

if (__DEV__) {
  Button.displayName = 'Button';
}
