import {BrowserRouter, RouterProvider} from "react-router-dom";
import {router} from "./modules/core/router.jsx";
import "@mantine/core/styles.css";
import {MantineProvider} from "@mantine/core";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <MantineProvider>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false}/>
                    <RouterProvider router={router}/>
                </QueryClientProvider>
            </MantineProvider>
        </>
    );
}

export default App;
