import { FloatingFocusManager } from '@floating-ui/react';
import { __DEV__, cx } from '@resolid/nxt-utils';
import { useEffect } from 'react';
import { useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { useFloatingAria } from '../floating/FloatingAriaContext';
import { useModal } from './ModalContext';

export const ModalContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;
  const { opened, status, setFloating, context, getFloatingProps, initialFocus, finalFocus, scrollBehavior } =
    useModal();

  const { labelId, descriptionId } = useFloatingAria();

  useEffect(() => {
    if (!opened) {
      finalFocus && finalFocus.current?.focus();
    }
  }, [opened, finalFocus]);

  const refs = useMergedRefs(ref, setFloating);

  return (
    <div
      className={cx(
        'fixed left-0 top-0 z-40 flex w-screen justify-center',
        scrollBehavior == 'inside' ? 'h-screen items-center' : 'h-full items-start overflow-y-auto'
      )}
    >
      <FloatingFocusManager initialFocus={initialFocus} returnFocus={finalFocus == undefined} context={context}>
        <div
          className={cx(
            'relative flex flex-col rounded border border-bg-muted bg-bg-default shadow transition-opacity duration-300',
            scrollBehavior == 'inside' ? 'max-h-[calc(100%-9rem)] ' : 'my-10',
            status == 'open' ? 'opacity-1' : 'opacity-0',
            className
          )}
          ref={refs}
          {...getFloatingProps({
            ...rest,
            'aria-labelledby': labelId,
            'aria-describedby': descriptionId,
          })}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </div>
  );
});

if (__DEV__) {
  ModalContent.displayName = 'ModalContent';
}
