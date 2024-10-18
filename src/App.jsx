import { ConfigProvider } from "antd";
import AppRouter from "@/routes";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider>
        <AppRouter />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
