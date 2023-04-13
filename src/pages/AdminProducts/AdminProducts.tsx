import { Button, Theme, Typography } from "@mui/material";
import AdminProductsGrid from "../../features/AdminProductsGrid";
import { useSelector } from "react-redux";
import { selectItems } from "../../features/ProductsGrid/productsGridSlice";
import AdminItem from "../../components/AdminItem";
import { Add } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.typography.pxToRem(16)
    }
}))

const AdminProducts = () => {

    // const items = useSelector(selectItems);

    const classes = useStyles()

    const items = [
        {
            id: 1,
            title: 'test',
            image: 'https://picsum.photos/500/500',
            priceInCents: 100,
            inStock: true,
            type: 'Painting',
            size: "5' x 5'"
        }
    ]

    const handleOpen = (modal: string) => {

    }

    return (
        <section>
            <div
            className={classes.headerContainer}
            >
                <Typography
                variant="h1"
                sx={(theme) => ({
                    [theme.breakpoints.up('md')]: {
                        fontSize: theme.typography.pxToRem(56)
                    }
                })}
                >
                    Products
                </Typography>
                <Button
                variant="contained"
                sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center'
                })}
                onClick={() => handleOpen('add')}
                >
                    <Add 
                    sx={(theme) => ({
                        fontSize:  `1rem`,
                        marginRight: theme.typography.pxToRem(4),
                        [theme.breakpoints.up(500)]: {
                            fontSize: theme.typography.pxToRem(24)
                        }
                    })}
                    />
                    <Typography
                    sx={(theme) => ({
                        fontSize:  `0.75rem`,
                        [theme.breakpoints.up(500)]: {
                            fontSize: theme.typography.pxToRem(16)
                        }
                    })}
                    >
                        Add Product
                    </Typography>
                </Button>
            </div>
            <AdminProductsGrid>
                {items.map(item => (
                    <AdminItem
                    item={item} 
                    />
                ))}
            </AdminProductsGrid>
        </section>
    );
}
 
export default AdminProducts;