import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Weep from "../../assets/images/weepforme.webp";
import ProductsGrid from "../../features/ProductsGrid";
import { clearItems, getPaintings, selectItems } from "../../features/ProductsGrid/productsGridSlice";
import { AppDispatch } from "../../utils/interfaces";
import Item from "../Item";

const Paintings = () => {

    const dispatch = useDispatch<AppDispatch>();

    const items = useSelector(selectItems)

    useEffect(() => {
        dispatch(getPaintings());
    
        return () => {
            dispatch(clearItems())
        }
    }, [dispatch])

    return (
        <>
            <Typography
            variant="h2"
            sx={(theme) => ({
                margin: `${theme.typography.pxToRem(16)} 0`,
                [theme.breakpoints.up('md')]: {
                    fontSize: theme.typography.pxToRem(42),
                }
            })}
            >
                Paintings
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
        </>
    );
}

export default Paintings;