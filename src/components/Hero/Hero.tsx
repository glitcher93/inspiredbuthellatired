import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Logo from '../../assets/logo/logo.webp';

const useStyles = makeStyles((theme: Theme) => ({
    img: {
        width: "100%",
        objectFit: "cover",
        aspectRatio: "16/9",
    },
    hero: {
        display: "flex",
        flexDirection: "column",
    }
}));

const Hero = () => {

    const classes = useStyles();

    return (
        <section
        className={classes.hero}
        >
            <Typography 
            variant="h1"
            sx={(theme) => ({
                fontSize: theme.typography.pxToRem(32),
                margin: `0 0 ${theme.typography.pxToRem(16)}`,
                fontWeight: 600,
                [theme.breakpoints.up('md')]: {
                    fontSize: theme.typography.pxToRem(56),
                }
            })}
            >
                Welcome to my store!
            </Typography>
            <img 
            src={Logo} 
            alt="Inspiredbuthellatired" 
            className={classes.img}
            />
        </section> 
    );
}

export default Hero;