import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import Featured from '../../components/Featured';
import Hero from '../../components/Hero';
import Alyssa from '../../assets/images/alyssa-1.webp';
import Weep from '../../assets/images/weepforme.webp';
import { useEffect } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    img: {
        width: "100%",
        height: `35vh`,
        objectFit: "cover",
        [theme.breakpoints.up('md')]: {
            height: `${theme.typography.pxToRem(450)}`
        },
        [theme.breakpoints.up('lg')]: {
            height: `75vh`
        }
    },
    hero: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    pageLinks: {
        display: "flex",
        flexDirection: "column",
        borderTop: `1px solid #E1E1E1`,
        margin: `${theme.typography.pxToRem(16)} 0`,
        padding: `${theme.typography.pxToRem(16)} 0 0`,
        width: "100%",
        [theme.breakpoints.up('md')]: {
            flexDirection: "row",
        }
    },
    link: {
        display: "flex",
        position: "relative",
        margin: `0 0 ${theme.typography.pxToRem(16)}`,
        '&:last-of-type': {
            marginBottom: 0
        },
        [theme.breakpoints.up('md')]: {
            width: "50%",
            margin: `0 ${theme.typography.pxToRem(16)} 0 0`,
        }
    },
    linkImg: {
        width: "100%",
        height: `${theme.typography.pxToRem(300)}`,
        objectFit: "cover"
    },
    linkText: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1,
        color: "transparent",
        backgroundColor: "none",
        transition: "color 0.3s, background-color 0.3s",
        '&:hover': {
            color: "#FFF",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            
        }
    }
}));

const Landing = () => {

    const classes = useStyles();

    useEffect(() => {
        document.title = "Home | Inspiredbuthellatired";
    }, [])

    return ( 
        <>
            <Hero />
            <Featured />
            <div 
            className={classes.pageLinks}
            >
                <NavLink
                to='/about-me'
                className={classes.link}
                >
                    <img 
                    src={Alyssa} 
                    alt="About Me" 
                    className={classes.linkImg}
                    />
                    <Typography
                    className={classes.linkText}
                    variant="h3"
                    component="p"
                    >
                        About Me
                    </Typography>
                </NavLink>
                <NavLink
                to='/products'
                className={classes.link}
                >
                    <img 
                    src={Weep} 
                    alt="Products" 
                    className={classes.linkImg}
                    />
                    <Typography
                    className={classes.linkText}
                    variant="h3"
                    component="p"
                    >
                        All Products
                    </Typography>
                </NavLink>
            </div>
        </>
    );
}

export default Landing;