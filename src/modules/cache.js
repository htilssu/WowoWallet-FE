import {QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function revalidateCache(cacheKey) {
  try {
    await queryClient.invalidateQueries({queryKey: [cacheKey]});
  } catch (e) {
    console.log(`Error revalidateCache with key {${cacheKey}}: `, e);
  }
}