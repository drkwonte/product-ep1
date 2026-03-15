import { useState } from 'react';

/**
 * useState와 동일한 API를 제공하면서 값을 localStorage에 자동 저장한다.
 * 함수형 업데이트 패턴 (setState(prev => ...)) 도 지원한다.
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  function setValue(updater: T | ((prev: T) => T)) {
    setState((prev) => {
      const next =
        typeof updater === 'function' ? (updater as (p: T) => T)(prev) : updater;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // 저장 공간 부족 등 오류는 무시하고 메모리 상태만 유지
      }
      return next;
    });
  }

  return [state, setValue] as const;
}
