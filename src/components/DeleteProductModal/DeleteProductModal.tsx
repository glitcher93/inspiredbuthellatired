import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IItem } from "../../utils/interfaces";
import { closeModal, deleteProduct, getProducts, selectDeleteModalStatus } from "../../features/AdminProductsGrid/adminProductsGridSlice";
import { Box, Button, IconButton, Modal, Theme, Typography } from "@mui/material";
import { Cancel, Close, Delete } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const useStyles = makeStyles((theme: Theme) => ({
    deleteButtons: {
        display: 'flex',
        alignSelf: 'center',
        margin: `${theme.typography.pxToRem(36)} 0`
    }
}))

const DeleteProductModal = ({item}: {item: IItem}) => {

    const dispatch = useDispatch<AppDispatch>();

    const deleteModalStatus = useSelector(selectDeleteModalStatus);

    const classes = useStyles();

    const token = localStorage.getItem("token")?.split(' ')[1]!;

    const handleClose = (modal: string) => {
        dispatch(closeModal({modal}));
    }

    const handleDelete = () => {

        dispatch(deleteProduct({token, id: item.id}))
            .unwrap()
            .then(() => {
                handleClose("delete");
                dispatch(getProducts({token}))
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Product Deleted!',
                            timer: 2000,
                            showConfirmButton: false
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong!',
                    text: 'The product is likely involved with an active order. The order must be fulfilled and deleted in order to delete this product.'
                })
            })
    }

    return (
        <Modal
        open={deleteModalStatus}
        onClose={() => handleClose("delete")}
        >
            <Box
            sx={(theme) => ({
                position: "absolute" as 'absolute',
                top: "50%",
                left: "50%",
                transform: 'translate(-50%, -50%)',
                backgroundColor: "#FFF",
                width: '85%',
                height: theme.typography.pxToRem(250),
                display: "flex",
                flexDirection: "column",
                padding: theme.typography.pxToRem(16),
                borderRadius: theme.typography.pxToRem(4),
                outline: "none",
                maxWidth: `492px`
            })}
            >
                <IconButton
                sx={(theme) => ({
                    alignSelf: "flex-end"
                })}
                onClick={() => handleClose("delete")}
                >
                    <Close />
                </IconButton>
                <Typography
                variant='h4'
                sx={(theme) => ({
                    fontFamily: 'Nunito Sans',
                    fontSize: theme.typography.pxToRem(18)
                })}
                >
                    Delete Product?
                </Typography>
                <Typography
                sx={(theme) => ({
                    marginTop: theme.typography.pxToRem(24),
                    textAlign: 'center'
                })}
                >
                    Are you sure you want to delete this product? (This action cannot be undone)
                </Typography>
                <div
                className={classes.deleteButtons}
                >
                    <Button
                    variant="contained"
                    sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#DD0000',
                        transition: 'background-color 0.3s',
                        marginRight: theme.typography.pxToRem(8),
                        '&:hover': {
                            backgroundColor: '#BB0000'
                        }
                    })}
                    onClick={() => handleClose("delete")}
                    >
                        <Cancel 
                        sx={(theme) => ({
                            fontSize: `1rem`,
                            marginRight: theme.typography.pxToRem(4)
                        })}
                        />
                        <Typography
                        sx={(theme) => ({
                            fontSize: `1rem`
                        })}
                        >
                            Cancel
                        </Typography>
                    </Button>
                    <Button
                    variant="contained"
                    sx={(theme) => ({
                        marginRight: theme.typography.pxToRem(8),
                        display: 'flex',
                        alignItems: 'center'
                    })}
                    onClick={handleDelete}
                    >
                        <Delete 
                        sx={(theme) => ({
                            fontSize: `1rem`,
                            marginRight: theme.typography.pxToRem(4)
                        })}
                        />
                        <Typography
                        sx={(theme) => ({
                            fontSize: `1rem`
                        })}
                        >
                            Delete
                        </Typography>
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}
 
export default DeleteProductModal;