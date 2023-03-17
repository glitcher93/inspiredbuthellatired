import { Link, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import Alyssa from "../../assets/images/alyssa-2.webp";

const useStyles = makeStyles((theme: Theme) => ({
    imgContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: theme.typography.pxToRem(16),
        [theme.breakpoints.up('md')]: {
            display: "none",
        }
    },
    img: {
        width: theme.typography.pxToRem(250),
        height: theme.typography.pxToRem(250),
        borderRadius: "50%",
        objectFit: "cover",
    },
    imgContainerTwo: {
        display: "none",
        [theme.breakpoints.up('md')]: {
            display: "flex",
            float: "right",
            shapeOutside: "circle(50%)",
            marginLeft: theme.typography.pxToRem(16),
            marginBottom: theme.typography.pxToRem(8),
            borderRadius: "50%",
            margin: 0
        }
    },
    textContainer: {
        [theme.breakpoints.up('md')]: {
            clear: "left",
            
        }
    },
    link: {
        textDecoration: "none",
        marginLeft: theme.typography.pxToRem(4),
        color: "#909090",
        transition: "color 0.3s",
        '&:hover': {
            color: "#0000FF",
        }
    },
    readMore: {
        display: "flex",
        flexDirection: "column"
    }
}))

const AboutMe = () => {

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
            <article>
                <Typography
                variant="h2"
                sx={(theme) => ({
                    margin: `${theme.typography.pxToRem(16)} 0`,
                    [theme.breakpoints.up('md')]: {
                        fontSize: theme.typography.pxToRem(42),
                    }
                })}
                >
                    About Me
                </Typography>
                <div>
                    <div
                    className={classes.imgContainer}
                    >
                        <img 
                        src={Alyssa}
                        alt="Alyssa Mallone"
                        className={classes.img}
                        />
                        <Typography
                        sx={(theme) => ({
                            marginTop: theme.typography.pxToRem(8),
                            color: "#909090",
                        })}
                        >
                            Photo by: 
                            <a 
                            href="https://www.instagram.com/vilegloomm"
                            className={classes.link}
                            >
                                @vilegloomm
                            </a>
                        </Typography>
                    </div>
                    <div
                    className={classes.textContainer}
                    >
                        <Typography
                        sx={(theme) => ({
                            marginBottom: theme.typography.pxToRem(16),
                        })}
                        >
                            "My name is Alyssa Mallone, also known as Inspiredbuthellatired"
                        </Typography>
                        <div
                        className={clsx(classes.imgContainer, classes.imgContainerTwo)}
                        >
                            <img 
                            src={Alyssa} 
                            alt="Alyssa Mallone"
                            className={classes.img}
                            />
                            <Typography
                            sx={(theme) => ({
                                marginTop: theme.typography.pxToRem(8),
                                color: "#909090",
                            })}
                            >
                                Photo by: 
                                <a 
                                href="https://www.instagram.com/vilegloomm"
                                className={classes.link}
                                >
                                    @vilegloomm
                                </a>
                            </Typography>
                        </div>
                        <Typography
                        sx={(theme) => ({
                            marginBottom: theme.typography.pxToRem(16),
                        })}
                        >
                        Alyssa (b. 1993, Vaughan, Canada) is a painter and mixed media artist who lives and works in Hamilton. She studied illustration at OCAD University and Seneca College as well as Visual and Digital Art at Humber College.
                        </Typography>
                        <Typography
                        sx={(theme) => ({
                            marginBottom: theme.typography.pxToRem(16),
                        })}
                        >
                            She works with these specific mediums because they add texture within her work that encourage viewers to physically want to touch when gazing at her work. It gives them the opportunity to connect with her pieces on a whole new level.
                        </Typography>
                        <Typography
                        sx={(theme) => ({
                            marginBottom: theme.typography.pxToRem(16),
                        })}
                        >
                            The main subject of Alyssa's work is the strange and the unusual which is important to her because she paints the macabre as a cathartic release. When finding it difficult to express herself verbally, she channels her emotions through painting. Her art-making process consists of gathering images from magazines, thrifting canvas and painting over them. This is important to understanding her work because she takes pride in reusing materials that already exist. Giving an unwanted medium life again sparks her creative process.
                        </Typography>
                        <Typography
                        sx={(theme) => ({
                            marginBottom: theme.typography.pxToRem(16),
                        })}
                        >
                            She chose the name "Inspiredbuthellatired" because some days she can be filled with creative ideas that need to be painted right away. Unfortunately, she tended to  overthink if anyone will even like her art and a brick wall was always hit. Using this alterego, it has allowed Alyssa to embrace the idea that her art isnt meant for everyone and that's completly okay. As long as she enjoys creating her weird little doodles, thats all that matters! She doesnt tend to overthink that much anymore when it comes to her art because, "Mum will always be my #1 fan, and I'm perfectly content with that!"
                        </Typography>
                    </div>
                </div>
            </article>
            <article
            className={classes.readMore}
            >
                <Typography
                variant="h3"
                sx={(theme) => ({
                    margin: `${theme.typography.pxToRem(16)} 0`,
                    fontSize: theme.typography.pxToRem(32),
                })}
                >
                    Read More
                </Typography>
                <Link
                href="https://beyondjames.com/sarahshotspot-21giftguide/"
                sx={(theme) => ({
                    fontFamily: "Nunito Sans",
                    fontSize: theme.typography.pxToRem(16),
                })}
                >
                    Beyond James - Sarah’s Hotspot: Hamilton Artists Holiday Gift Guide
                </Link>
                <Link
                href="https://cfmu.ca/posts/449-artinthehammer-inspiredbuthellatired"
                sx={(theme) => ({
                    fontFamily: "Nunito Sans",
                    fontSize: theme.typography.pxToRem(16),
                    marginTop: theme.typography.pxToRem(8),
                })}
                >
                    CFMU - #ArtInTheHammer: InspiredButHellaTired
                </Link>
            </article>
        </section> 
    );
}
 
export default AboutMe;