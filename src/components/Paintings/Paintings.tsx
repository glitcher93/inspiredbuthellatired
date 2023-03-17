import Weep from "../../assets/images/weepforme.webp";
import ProductsGrid from "../../features/ProductsGrid";
import Item from "../Item";

const Paintings = () => {

    const items = [
        {
            id: 1,
            image: Weep,
            title: "Item 1",
            size: "30\" x 20\"",
            price: 100,
            type: 'Print'
        },
        {
            id: 2,
            image: Weep,
            title: "Item 2",
            size: "30\" x 20\"",
            price: 100,
            type: 'Painting'
        },
        {
            id: 3,
            image: Weep,
            title: "Item 3",
            size: "30\" x 20\"",
            price: 100,
            type: 'Print'
        },
        {
            id: 4,
            image: Weep,
            title: "Item 4",
            size: "30\" x 20\"",
            price: 100,
            type: 'Painting'
        },
        {
            id: 5,
            image: Weep,
            title: "Item 5",
            size: "30\" x 20\"",
            price: 100,
            type: 'Print'
        },
        {
            id: 6,
            image: Weep,
            title: "Item 6",
            size: "30\" x 20\"",
            price: 100,
            type: 'Painting'
        },
    ]

    return (
        <>
            <ProductsGrid>
                {items.map(item => (
                    <Item 
                    key={item.id}
                    item={item} 
                    />
                ))}
            </ProductsGrid>
        </>
    );
}
 
export default Paintings;