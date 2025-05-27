import { isThisMonth, isThisWeek, isToday, parseISO } from 'date-fns';
import { useMemo } from 'react';

export type FilterType = 'Todos' | 'Hoy' | 'Semana' | 'Mes';

export const useFilteredByDate = <T>(
  items: T[],
  filter: FilterType,
  dateKey: keyof T
) => {
  return useMemo(() => {
    return items.filter((item) => {
      const dateStr = item[dateKey];
      if (typeof dateStr !== 'string') return false;

      const date = parseISO(dateStr);
      switch (filter) {
        case 'Hoy':
          return isToday(date);
        case 'Semana':
          return isThisWeek(date, { weekStartsOn: 1 });
        case 'Mes':
          return isThisMonth(date);
        default:
          return true;
      }
    });
  }, [items, filter, dateKey]);
};
