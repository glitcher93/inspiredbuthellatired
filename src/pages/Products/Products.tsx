import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, Outlet } from "react-router-dom";
import Weep from "../../assets/images/weepforme.webp";

const useStyles = makeStyles((theme: Theme) => ({
    links: {
        marginBottom: theme.typography.pxToRem(16),
        display: "flex",
    },
    link: {
        fontFamily: "Nunito Sans",
        fontSize: theme.typography.pxToRem(16),
        marginLeft: theme.typography.pxToRem(8),
        textDecoration: "none",
        backgroundColor: "#0000BB",
        padding: `${theme.typography.pxToRem(8)} ${theme.typography.pxToRem(16)}`,
        color: "#FFF",
        borderRadius: theme.typography.pxToRem(8),
        transition: "background-color 0.3s",
        '&:hover': {
            backgroundColor: "#0000FF",
        },
        '&:first-of-type': {
            marginLeft: 0
        }
    }
}))

const Products = () => {

    const classes = useStyles();

    return ( 
        <section>
            <Typography
            variant="h1"
            sx={(theme) => ({
                fontSize: theme.typography.pxToRem(32),
                margin: `0 0 ${theme.typography.pxToRem(16)}`,
                fontWeight: 600,
                textTransform: "uppercase",
                textAlign: "center",
                [theme.breakpoints.up('md')]: {
                    fontSize: theme.typography.pxToRem(56),
                }
            })}
            >
                Inspiredbuthellatired
            </Typography>
            <Typography
            variant="h2"
            sx={(theme) => ({
                margin: `${theme.typography.pxToRem(16)} 0`,
                [theme.breakpoints.up('md')]: {
                    fontSize: theme.typography.pxToRem(42),
                }
            })}
            >
                Products
            </Typography>
            <div
            className={classes.links}
            >
                <Link 
                to="all"
                className={classes.link}
                >
                    All
                </Link>
                <Link 
                to="paintings"
                className={classes.link}
                >
                    Paintings
                </Link>
                <Link 
                to="prints"
                className={classes.link}
                >
                    Prints
                </Link>
            </div>
            <Outlet />
        </section> 
    );
}

export default Products;