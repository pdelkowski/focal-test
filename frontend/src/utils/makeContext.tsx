/*
    Generic context maker. Creates provider and consumer
    for provided context hook with given type.
*/
import React, { FC, createContext, useContext } from "react";
import { Hook } from "../types/common";

type ContextType<T> = { useConsumer: Hook<T>; Provider: FC };

export const makeContext = function <T>(contextHook: Hook<T>): ContextType<T> {
  /*
      Private context component. Can be injected by `withProvider` function,
      and accessed with `useConsumer` hook.
  */
  const Context = createContext<T>({} as T);

  /*
      Private provider component. Can be injected in the component tree by
      `withProvider` hoc, to create a scope, where the context would be
      accessible via `useConsumer` hook.
  */
  const Provider: FC = ({ ...rest }) => (
    <Context.Provider value={contextHook()} {...rest} />
  );

  /*
      Public consumer hook. Can be used within the component tree, where
      provider component was injected as a root. Allows for access to
      context state variables and actions.
  */
  const useConsumer = (): T => useContext(Context);

  return {
    useConsumer,
    Provider,
  };
};
