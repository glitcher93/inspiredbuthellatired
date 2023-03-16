import { RouteProps } from "react-router-dom";
import store from "../app/store";

export interface ILayoutProps {
    children: RouteProps["children"]
}

export interface ICartItem {
    id: number
    title: string
    price: number
    image: string
    size: string
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;