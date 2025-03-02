import { useEffect, useState } from "react";

export function usePersistFormik<T>(key: string, initialValues: T) {
  const [savedValues, setSavedValues] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : initialValues;
    }
    return initialValues;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(savedValues));
  }, [savedValues, key]);

  return [savedValues, setSavedValues] as const;
}
