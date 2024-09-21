import {RouterProvider} from 'react-router-dom';
import {router} from './modules/core/router.jsx';
import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './modules/core/cache.js';
import {AuthProvider} from './modules/hooks/useAuth.jsx';

function App() {
  const mode = import.meta.env.MODE;
  return (
      <>
        <MantineProvider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              {mode === 'development' && <ReactQueryDevtools initialIsOpen={false}/>}
              <RouterProvider router={router}/>
            </QueryClientProvider>
          </AuthProvider>
        </MantineProvider>
      </>
  );
}

export default App;
