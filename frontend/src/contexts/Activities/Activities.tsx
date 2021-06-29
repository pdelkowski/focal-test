import React, { useReducer, createContext, useContext } from "react";
import { Activity } from "../../types/user";

const initialState = {
  data: [],
};

export type State = {
  data: Array<Activity>;
};

type Action =
  | { type: "FETCH_ACTIVITIES"; payload: Array<Activity> }
  | { type: "GET_ACTIVITY"; payload: Activity }
  | { type: "RESET_ACTIVITES" };

const stateContext = createContext(initialState as State);
const dispatchContext = createContext((() => 0) as React.Dispatch<Action>);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_ACTIVITIES": {
      const fetchedActivities = action.payload;
      const data = [...fetchedActivities];

      return {
        ...state,
        data,
      };
    }
    case "GET_ACTIVITY": {
      const fetchedActivity = action.payload;
      const data = [
        ...state.data.filter(
          (stateActivity) => stateActivity.id !== fetchedActivity.id
        ),
        fetchedActivity,
      ];

      return {
        ...state,
        data,
      };
    }
    case "RESET_ACTIVITES": {
      return initialState;
    }
    default:
      return state;
  }
};

export const ActivitiesProvider: React.ComponentType = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <dispatchContext.Provider value={dispatch}>
      <stateContext.Provider value={state}>{children}</stateContext.Provider>
    </dispatchContext.Provider>
  );
};

export const useActivitiesDispatch = () => {
  return useContext(dispatchContext);
};

export const useActivities = () => {
  const state = useContext(stateContext);
  return state;
};
