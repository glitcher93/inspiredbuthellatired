import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsGrid from "../../features/ProductsGrid";
import { clearItems, getFeatured, selectItems } from "../../features/ProductsGrid/productsGridSlice";
import { AppDispatch } from "../../utils/interfaces";
import Item from "../Item/Item";

const Featured = () => {

    const dispatch = useDispatch<AppDispatch>();

    const items = useSelector(selectItems);

    useEffect(() => {
        dispatch(getFeatured())

        return () => {
            dispatch(clearItems())
        }
    }, [dispatch])

    return (
        <section>
            <Typography
            variant="h2"
            sx={(theme) => ({
                margin: `${theme.typography.pxToRem(16)} 0`,
                [theme.breakpoints.up('md')]: {
                    fontSize: theme.typography.pxToRem(42),
                }
            })}
            >
                Featured
            </Typography>
            <ProductsGrid>
                {items.map(item =>{ 
                    return item.inStock ? (
                    <Item 
                    key={item.id}
                    item={item} 
                    />) :
                    null
                })}
            </ProductsGrid>
        </section>
    );
}
 
export default Featured;