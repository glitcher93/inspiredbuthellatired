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
    type: string
    quantity?: number
}

export interface IItem {
    id: number 
    price: number 
    title: string 
    size: string 
    image: string 
    type: string
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;