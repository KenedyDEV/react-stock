import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { StockProvider } from "./contexts/StockContext";

function App() {

  return (
    <StockProvider>
        <RouterProvider router={router}/>
    </StockProvider>
  )
}

export default App
