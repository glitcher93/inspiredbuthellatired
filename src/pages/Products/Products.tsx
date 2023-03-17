import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { NavLink, Outlet } from "react-router-dom";


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
    },
    active: {
        backgroundColor: "#0000FF",
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
            <nav
            className={classes.links}
            >
                <NavLink 
                to="all"
                className={({isActive}) => isActive ? clsx(classes.link, classes.active) : classes.link}
                >
                    All
                </NavLink>
                <NavLink 
                to="paintings"
                className={({isActive}) => isActive ? clsx(classes.link, classes.active) : classes.link}
                >
                    Paintings
                </NavLink>
                <NavLink 
                to="prints"
                className={({isActive}) => isActive ? clsx(classes.link, classes.active) : classes.link}
                >
                    Prints
                </NavLink>
            </nav>
            <Outlet />
        </section> 
    );
}

export default Products;