import { Grid, Typography } from "@mui/material";
import Weep from '../../assets/images/weepforme.webp';
import Item from "../Item/Item";

const Featured = () => {

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
            <Grid 
            container 
            spacing={2}
            >
                {items.map((item) => (
                    <Item 
                    key={item.id}
                    item={item}
                    />
                ))}
            </Grid>
        </section>
    );
}
 
export default Featured;