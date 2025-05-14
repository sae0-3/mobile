import { queryClient } from '../lib/queryClient';

export const invalidateQueries = (queries: unknown[][]) => {
  queries.map(async (key) => {
    await queryClient.invalidateQueries({ queryKey: key });
  });
};
