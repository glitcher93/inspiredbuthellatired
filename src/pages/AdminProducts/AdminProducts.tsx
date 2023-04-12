import { Typography } from "@mui/material";
import AdminProductsGrid from "../../features/AdminProductsGrid";

const AdminProducts = () => {
    return (
        <section>
            <Typography
            variant="h1"
            sx={(theme) => ({
                marginBottom: theme.typography.pxToRem(16),
                [theme.breakpoints.up('md')]: {
                    fontSize: theme.typography.pxToRem(56)
                }
            })}
            >
                Products
            </Typography>
            <AdminProductsGrid>

            </AdminProductsGrid>
        </section>
    );
}
 
export default AdminProducts;