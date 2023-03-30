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