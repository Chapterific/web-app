import React from "react";
import { useImmer } from "use-immer";

const AppStateContext = React.createContext(null);

export const AppStateProvider = ({ children }) => {
  const [state, setState] = useImmer({ bookQuery: "neuromancer" });
  const updateQuery = (query) =>
    setState((draft) => {
      draft.bookQuery = query;
      return draft;
    });
  return (
    <AppStateContext.Provider value={[state, updateQuery]}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = React.useContext<any>(AppStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }

  return context;
};
