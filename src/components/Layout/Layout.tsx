import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { ILayoutProps } from "../../utils/interfaces";


const useStyles = makeStyles((theme: Theme) => ({
    toolbar: theme.mixins.toolbar
}), {index: 1})

const Layout = ({ children }: ILayoutProps) => {

    const classes = useStyles();

    return (
        <div>
            <div className={classes.toolbar}></div>
            {children}
        </div> 
    );
}

export default Layout;
