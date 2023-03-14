import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { ILayoutProps } from "../../utils/interfaces";
import Footer from "../Footer";


const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        padding: "1rem",
        width: "100%",
        [theme.breakpoints.up('md')]: {
            padding: "1rem 2.25rem"
        },
        [theme.breakpoints.up('lg')]: {
            padding: "1rem 0",
            margin: "0 auto",
            maxWidth: "85%",
        }
    }
}), {index: 1})

const Layout = ({ children }: ILayoutProps) => {

    const classes = useStyles();

    return (
        <>
            <main
            className={classes.wrapper}
            >
                {children}
            </main>
            <Footer />
        </> 
    );
}

export default Layout;
