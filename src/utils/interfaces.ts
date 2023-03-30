import { RouteProps } from "react-router-dom";
import store from "../app/store";

export interface ILayoutProps {
    children: RouteProps["children"]
}

export interface ICartItem {
    id: number
    title: string
    priceInCents: number
    image: string
    size: string
    type: string
    inStock: boolean
    quantity?: number
}

export interface IItem {
    id: number 
    priceInCents: number 
    title: string 
    size: string 
    image: string 
    type: string
    inStock: boolean
}

export interface IProductProps {
    item: IItem
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;