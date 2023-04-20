import { RouteProps } from "react-router-dom";
import store from "../app/store";

export interface ILayoutProps {
    children: RouteProps["children"]
}

export interface ICartItem {
    id: string
    title: string
    priceInCents: number
    image: string
    size: string
    type: string
    inStock?: boolean
    quantity?: number
}

export interface IItem {
    id: string 
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

export interface IOrder {
    id: string
    orderId: string
    paymentIntentId?: string
    paymentStatus: string
    subtotal: number
    total: number
    shippingInfo: IShippingInfo
    items: ICartItem[]
}

interface IShippingInfo {
    name: string
    addressLineOne: string
    addressLineTwo?: string
    city: string
    state: string
    postalCode: string
    phoneNumber: string
    trackingNumber?: string
    isFulfilled: boolean
    createdAt: string
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;