import HomeView from "views/Home/Home.view";
import LoginView from "views/Auth/Login.view";
import LoginConfirm from "views/Auth/LoginConfirm.view";

export interface PathRoute {
  path: string;
  name: string;
  Component: any;
  isPrivate: boolean;
  exact?: boolean;
}

export const routes: PathRoute[] = [
  { path: "/login", name: "Login", Component: LoginView, isPrivate: false },
  {
    path: "/login-confirm",
    name: "Confirm login",
    Component: LoginConfirm,
    isPrivate: false,
  },
  { path: "/", name: "Home", Component: HomeView, isPrivate: true },
  { path: "/home/dashboard", name: "Home", Component: HomeView, isPrivate: true },
];

export default routes;
