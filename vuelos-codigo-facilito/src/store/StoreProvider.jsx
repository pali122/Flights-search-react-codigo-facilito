import { createContext, useReducer } from "react";
import storeReducer, { initialStore } from "./StoreReducer";

const StoreContext = createContext();

function tokenRefresh(store, dispatch) {
  if (cache.current["tokenTime"]) {
    x = dayjs().unix();
    y = cache.current["tokenTime"];
    if (
      dayjs.duration(x.diff(y, "second")) >
      cache.current["https://test.api.amadeus.com/v1/security/oauth2/token"]
    );
  }

  if (url == "https://test.api.amadeus.com/v1/security/oauth2/token") {
    cache.current["tokenTime"] = dayjs().unix();
  }
}

const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  return (
    <StoreContext.Provider value={[store, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext };
export default StoreProvider;
