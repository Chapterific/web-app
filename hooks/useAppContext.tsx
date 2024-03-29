import React from "react";
import { useImmer } from "use-immer";
import { useGroup } from "../hooks/useGroup";
import { useUsers } from "../hooks/useUsers";

// (Sean Rivard-Morton) [2020-10-09] NOTE:
// Avoid adding items to appState if possible.
// global state is bad. JS has scopes for a reason.
const AppStateContext = React.createContext(null);

export const AppStateProvider = ({ children }) => {
  // (Sean Rivard-Morton) [2020-10-09] TODO:
  // If appState does get more complicated, we will replace useImmer with
  // useImmerReducer, which functions the same as useReduce() except it
  // lets you modify a draft object.
  const { data: user } = useUsers();

  const [state, setState] = useImmer<{
    bookQuery: string;
    activeGroup: string;
  }>({
    bookQuery: "",
    activeGroup: null,
  });
  const updateAppState = (payload: {
    bookQuery?: string;
    activeGroup?: string;
  }) =>
    setState((draft) => {
      draft = { ...draft, ...payload };
      return draft;
    });

  React.useEffect(() => {
    if (user) {
      updateAppState({ activeGroup: user.groups[0].name });
    }
  }, [user]);

  return (
    <AppStateContext.Provider value={[state, updateAppState]}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }

  return context;
};
