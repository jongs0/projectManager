import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Router.tsx";

export const API_URL = "http://localhost:8080";

const queryClient = new QueryClient();

 function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
export default App