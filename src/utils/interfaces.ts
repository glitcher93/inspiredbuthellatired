import { RouteProps } from "react-router-dom";
import store from "../app/store";

export interface ILayoutProps {
    children: RouteProps["children"]
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;