import Weep from "../../assets/images/weepforme.webp";
import ProductsGrid from "../../features/ProductsGrid";
import Item from "../Item";

const All = () => {

    const items = [
        {
            id: 1,
            image: Weep,
            title: "Item 1",
            size: "30\" x 20\"",
            price: 100
        },
        {
            id: 2,
            image: Weep,
            title: "Item 2",
            size: "30\" x 20\"",
            price: 100
        },
        {
            id: 3,
            image: Weep,
            title: "Item 3",
            size: "30\" x 20\"",
            price: 100
        },
        {
            id: 4,
            image: Weep,
            title: "Item 4",
            size: "30\" x 20\"",
            price: 100
        },
        {
            id: 5,
            image: Weep,
            title: "Item 5",
            size: "30\" x 20\"",
            price: 100
        },
        {
            id: 6,
            image: Weep,
            title: "Item 6",
            size: "30\" x 20\"",
            price: 100
        },
    ]

    return (
        <>
            <ProductsGrid>
            {items.map(item => (
                <Item item={item} />
            ))}
            </ProductsGrid>
        </>
    );
}
 
export default All;