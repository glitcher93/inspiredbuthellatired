import { Button, Theme, Typography } from "@mui/material";
import AdminProductsGrid from "../../features/AdminProductsGrid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AdminItem from "../../components/AdminItem";
import { Add } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { AppDispatch } from "../../utils/interfaces";
import { clearItems, getProducts, openModal, selectItem, selectItems } from "../../features/AdminProductsGrid/adminProductsGridSlice";
import AddProductModal from "../../components/AddProductModal";
import EditProductModal from "../../components/EditProductModal";
import DeleteProductModal from "../../components/DeleteProductModal";

const useStyles = makeStyles((theme: Theme) => ({
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.typography.pxToRem(16)
    }
}))

const AdminProducts = () => {

    const dispatch = useDispatch<AppDispatch>();

    const items = useSelector(selectItems);
    const item = useSelector(selectItem);

    const classes = useStyles();

    const token = localStorage.getItem("token")?.split(' ')[1]!;

    const handleOpen = (modal: string) => {
        dispatch(openModal({modal}))
    }

    useEffect(() => {
        dispatch(getProducts({token}))

        document.title = "Product Management | Inspiredbuthellatired";

        return () => {
            dispatch(clearItems())
        }
    }, [dispatch])

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
                    key={item.id}
                    item={item} 
                    />
                ))}
            </AdminProductsGrid>
            <AddProductModal />
            <EditProductModal item={item} />
            <DeleteProductModal item={item} />
        </section>
    );
}
 
export default AdminProducts;