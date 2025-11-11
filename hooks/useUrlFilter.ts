import { useEffect, useState, useMemo, useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

type MultiFilterReturn = [
  string[],
  (value: string | string[]) => void
];
type SingleFilterReturn = [
  string,
  (value: string) => void
];

export function useUrlFilter(
  options: { paramName: string; isMulti: true }
): MultiFilterReturn;
export function useUrlFilter(
  options: { paramName: string; isMulti: false }
): SingleFilterReturn;
export function useUrlFilter({ paramName, isMulti }: { paramName: string; isMulti: boolean }) {
  const router = useRouter();
  const searchParameters = useSearchParams();

  const initialValue = useMemo(() => {
    const parameter = searchParameters.get(paramName);
    if (!parameter) return isMulti ? [] : "";
    return isMulti ? parameter.split(',') : parameter;
  }, [searchParameters, paramName, isMulti]);

  const [selectedValue, setSelectedValue] = useState<typeof initialValue>(initialValue);
  const [pendingUpdate, setPendingUpdate] = useState<{ paramName: string; value: string | string[] } | null>(null);

  useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (pendingUpdate) {
      const { paramName, value } = pendingUpdate;
      const parameters = new URLSearchParams(searchParameters.toString());

      if (isMulti) {
        const newSelected = value as string[];
        if (newSelected.length > 0) {
          parameters.set(paramName, newSelected.join(','));
        } else {
          parameters.delete(paramName);
        }
      } else {
        const newValue = value as string;
        if (newValue) {
          parameters.set(paramName, newValue);
        } else {
          parameters.delete(paramName);
        }
      }

      router.replace(`?${parameters.toString()}`);
      setPendingUpdate(null);
    }
  }, [pendingUpdate, paramName, isMulti, searchParameters, router]);

  const toggleValue = useCallback((value: string | string[]) => {
    if (isMulti) {
      let newSelected: string[];
      if (Array.isArray(value)) {
        newSelected = value;
      } else {
        const current = selectedValue as string[];
        newSelected = current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value];
      }
      setSelectedValue(newSelected);
      setPendingUpdate({ paramName, value: newSelected });
    } else {
      const newValue = value as string;
      setSelectedValue(newValue);
      setPendingUpdate({ paramName, value: newValue });
    }
  }, [paramName, isMulti, selectedValue]);

  return [selectedValue, toggleValue] as MultiFilterReturn | SingleFilterReturn;
}
