import { useEffect, useCallback } from 'react';

type Shortcut = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  handler: () => void;
  preventDefault?: boolean;
};

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const matchesKey = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const matchesCtrl = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey;
        const matchesShift = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const matchesAlt = shortcut.alt ? event.altKey : !event.altKey;

        if (matchesKey && matchesCtrl && matchesShift && matchesAlt) {
          if (shortcut.preventDefault) {
            event.preventDefault();
          }
          shortcut.handler();
          break;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}