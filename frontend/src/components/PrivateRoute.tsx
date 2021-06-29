import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useAuth } from "contexts/Auth";

type Props = {
  component: React.ElementType;
} & RouteProps;

export const PrivateRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        const currentUser = auth?.user;

        if (!currentUser) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
};
