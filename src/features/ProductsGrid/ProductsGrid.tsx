import { Grid } from "@mui/material";
import { ILayoutProps } from "../../utils/interfaces";

const ProductsGrid = ({children}: ILayoutProps) => {
    return (
        <Grid container spacing={2}>
            {children}
        </Grid>
    );
}
 
export default ProductsGrid;