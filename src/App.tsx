import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import { AuthProvider } from "./context/AuthContext";

import "nprogress/nprogress.css";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
