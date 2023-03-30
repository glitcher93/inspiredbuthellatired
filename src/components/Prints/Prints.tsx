import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsGrid from "../../features/ProductsGrid";
import { clearItems, getPrints, selectItems } from "../../features/ProductsGrid/productsGridSlice";
import { AppDispatch } from "../../utils/interfaces";
import Item from "../Item";

const Prints = () => {

    const dispatch = useDispatch<AppDispatch>();

    const items = useSelector(selectItems);

    useEffect(() => {
        dispatch(getPrints());

        return () => {
            dispatch(clearItems());
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
 
export default Prints;