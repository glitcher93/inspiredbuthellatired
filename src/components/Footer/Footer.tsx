import { EmailOutlined, Instagram } from "@mui/icons-material";
import { Link, SvgIconTypeMap, Theme, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
    footer: {
        borderTop: `1px solid #000`,
        padding: "1rem",
        width: "100%",
        [theme.breakpoints.up('md')]: {
            display: "flex",
            padding: "1rem 2.25rem",
            justifyContent: "space-between",
        },
        [theme.breakpoints.up('lg')]: {
            padding: "1rem 0",
            margin: "0 auto",
            maxWidth: "85%",
            justifyContent: "flex-start",
        }
    },
    footerContainer: {
        margin: `${theme.typography.pxToRem(16)} 0`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.up('md')]: {
            width: "33%",
            alignItems: "flex-start",
            margin: `${theme.typography.pxToRem(16)} ${theme.typography.pxToRem(48)} 0 0`,
        },
    },
    link: {
        textDecoration: "none",
        color: "#000",
        transition: "color 0.3s",
        '&:hover': {
            color: "#0000FF"
        }
    },
    tiktok: {
        width: `${theme.typography.pxToRem(24)}`,
    }
}));

const TikTok: OverridableComponent<SvgIconTypeMap<{}, "svg">> = ({ className = '' }) => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        className={clsx(className, "MuiSvgIcon-root", "MuiSvgIcon-fontSizeMedium", "css-1jxdcj3-MuiSvgIcon-root")}
        >
            <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
        </svg>
    );
};

const Footer = () => {

    const classes = useStyles();

    return ( 
        <footer
        className={classes.footer}
        >
            <article
            className={classes.footerContainer}
            >
                <Typography
                variant="h4"
                sx={(theme) => ({
                    textTransform: "uppercase",
                    fontSize: theme.typography.pxToRem(20),
                })}
                >
                    Inspiredbuthellatired
                </Typography>
                <Typography
                sx={(theme) => ({
                    margin: `${theme.typography.pxToRem(16)} 0 0`,
                    textAlign: "center",
                    [theme.breakpoints.up('md')]: {
                        textAlign: "left",
                    }
                })}
                >
                The main subject of Alyssa's work is the strange and the unusual which is important to her because she paints the macabre as a cathartic release.
                </Typography>
            </article>
            <article
            className={classes.footerContainer}
            >
                <Typography
                variant="h4"
                sx={(theme) => ({
                    textTransform: "uppercase",
                    fontSize: theme.typography.pxToRem(20),
                    margin: `0 0 ${theme.typography.pxToRem(16)}`,
                })}
                >
                    Main Menu
                </Typography>
                <NavLink
                to='/about-me'
                className={classes.link}
                >
                    <Typography
                    variant="body1"
                    sx={(theme) => ({
                        margin: `0 0 ${theme.typography.pxToRem(8)}`,
                    })}
                    >
                        About Me
                    </Typography>
                </NavLink>
                <NavLink
                to="/products"
                className={classes.link}
                >
                    <Typography
                    sx={(theme) => ({
                        margin: `0 0 ${theme.typography.pxToRem(8)}`,
                    })}
                    >
                        Products
                    </Typography>
                </NavLink>
            </article>
            <article
            className={classes.footerContainer}
            >
                <Typography
                variant="h4"
                sx={(theme) => ({
                    textTransform: "uppercase",
                    fontSize: theme.typography.pxToRem(20),
                })}
                >
                    Follow Me
                </Typography>
                <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/inspiredbuthellatired/"
                sx={(theme) => ({
                    display: "flex",
                    alignItems: "center",
                    color: "#000",
                    textDecoration: "none",
                    margin: `${theme.typography.pxToRem(8)} 0`,
                    transition: "color 0.3s",
                    '&:hover': {
                        color: "#0000FF"
                    }
                })}
                >
                    <Instagram />
                    <Typography
                    sx={(theme) => ({
                        margin: `0 ${theme.typography.pxToRem(8)}`,
                    })}
                    >
                        Instagram
                    </Typography>
                </Link>
                <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/@inspiredbuthellatired"
                sx={(theme) => ({
                    display: "flex",
                    alignItems: "center",
                    color: "#000",
                    textDecoration: "none",
                    margin: `${theme.typography.pxToRem(8)} 0`,
                    transition: "color 0.3s",
                    '&:hover': {
                        color: "#0000FF"
                    }
                })}
                >
                    <TikTok 
                    className={classes.tiktok}
                    />
                    <Typography
                    sx={(theme) => ({
                        margin: `0 ${theme.typography.pxToRem(8)}`,
                    })}
                    >
                        Tiktok
                    </Typography>
                </Link>
                <Link
                target="_blank"
                rel="noopener noreferrer"
                sx={(theme) => ({
                    display: "flex",
                    alignItems: "center",
                    color: "#000",
                    textDecoration: "none",
                    margin: `${theme.typography.pxToRem(8)} 0`,
                    transition: "color 0.3s",
                    '&:hover': {
                        color: "#0000FF"
                    }
                })}
                href="mailto:alyssamallone@hotmail.com"
                >
                    <EmailOutlined />
                    <Typography
                    sx={(theme) => ({
                        margin: `0 ${theme.typography.pxToRem(8)}`,
                    })}
                    >
                        Email
                    </Typography>
                </Link>
            </article>
        </footer>
    );
}

export default Footer;