import { isThisMonth, isThisWeek, isToday, parseISO } from 'date-fns';
import { useMemo } from 'react';
import { OrderWithItems } from '../types/apiTypes';

export type FilterType = 'Todos' | 'Hoy' | 'Semana' | 'Mes';

export const useFilteredOrders = (orders: OrderWithItems[], filter: FilterType) => {
  return useMemo(() => {
    return orders.filter(order => {
      const date = parseISO(order.created_at);

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
  }, [orders, filter]);
}
