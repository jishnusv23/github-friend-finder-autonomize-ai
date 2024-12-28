import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "./redux/store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-center" theme="light" />
      <App />
    </Provider>
  </StrictMode>
);
