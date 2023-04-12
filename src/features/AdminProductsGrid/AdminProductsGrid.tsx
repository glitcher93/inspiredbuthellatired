import { Grid } from "@mui/material";
import { ILayoutProps } from "../../utils/interfaces";

const AdminProductsGrid = ({children}: ILayoutProps) => {
    return (
        <Grid container spacing={2}>
            {children}
        </Grid>
    );
}
 
export default AdminProductsGrid;