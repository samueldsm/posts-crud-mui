import { store } from "./store";
import { Provider } from "react-redux";

export function ProvidersRedux({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
