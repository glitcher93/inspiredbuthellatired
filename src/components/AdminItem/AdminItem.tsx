import { Button, Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { AppDispatch, IItem, IProductProps } from "../../utils/interfaces";
import { Delete, Edit } from "@mui/icons-material";
import { openModal } from "../../features/AdminProductsGrid/adminProductsGridSlice";

const useStyles = makeStyles((theme: Theme) => ({
    image: {
        width: "50%",
        height: `100%`,
        objectFit: "cover",
        [theme.breakpoints.up('md')]: {
            width: "100%",
        }
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}))

const AdminItem = ({ item }: IProductProps) => {

    const classes = useStyles();

    const dispatch = useDispatch<AppDispatch>();

    const handleOpen = (modal: string, item: IItem) => {
        dispatch(openModal({modal, item}))
    }

    return (
        <Grid 
        item 
        sm={12} 
        md={4} 
        lg={3}
        sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
        })}
        >
            <img 
            src={item.image} 
            alt={item.title}
            className={classes.image} 
            />
            <Typography
            variant="h3"
            sx={(theme) => ({
                fontFamily: "Nunito Sans",
                fontSize: theme.typography.pxToRem(22),
                margin: `${theme.typography.pxToRem(8)} 0 0`,
            })}
            >
                {item.title}
            </Typography>
            <Typography
            sx={(theme) => ({
                fontFamily: "Nunito Sans",
                fontSize: theme.typography.pxToRem(18),
                margin: `${theme.typography.pxToRem(4)} 0 0`,
                fontWeight: 400,
            })}
            >
                {item.size}
            </Typography>
            <Typography
            sx={(theme) => ({
                fontFamily: "Nunito Sans",
                fontSize: theme.typography.pxToRem(18),
                margin: `${theme.typography.pxToRem(4)} 0`,
                fontWeight: 400,
            })}
            >
                ${Number(item.priceInCents / 100).toFixed(2)}
            </Typography>
            <div
            className={classes.buttonContainer}
            >
                <Button
                sx={(theme) => ({
                    backgroundColor: "#0000BB",
                    color: "#FFF",
                    padding: theme.typography.pxToRem(8),
                    transition: 'background-color 0.3s',
                    width: '50%',
                    marginBottom: theme.typography.pxToRem(8),
                    '&:hover': {
                        backgroundColor: "#0000FF",
                    },
                    [theme.breakpoints.up('md')]: {
                        width: '100%'
                    }
                })}
                onClick={() => handleOpen('edit', item)}
                >
                    <Edit 
                    sx={(theme) => ({
                        marginRight: theme.typography.pxToRem(4)
                    })}
                    />
                    <Typography>
                        Edit
                    </Typography>
                </Button>
                <Button
                sx={(theme) => ({
                    backgroundColor: "#BB0000",
                    color: "#FFF",
                    padding: theme.typography.pxToRem(8),
                    transition: 'background-color 0.3s',
                    width: '50%',
                    '&:hover': {
                        backgroundColor: "#DD0000",
                    },
                    [theme.breakpoints.up('md')]: {
                        width: '100%'
                    }
                })}
                onClick={() => handleOpen('delete', item)}
                >
                    <Delete
                    sx={(theme) => ({
                        marginRight: theme.typography.pxToRem(4)
                    })}
                    />
                    <Typography>
                        Delete
                    </Typography>
                </Button>
            </div>
        </Grid>
    );
}

export default AdminItem;