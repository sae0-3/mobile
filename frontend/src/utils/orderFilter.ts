import { OrderWithItems } from '../types/apiTypes';
import { isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';

export type FilterType = 'Todos' | 'Hoy' | 'Semana' | 'Mes';

export const filterOrderByDate = (
  orders: OrderWithItems[],
  selected: FilterType
) => {
  return orders.filter((order) => {
    const date = parseISO(order.created_at);
    switch (selected) {
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
}