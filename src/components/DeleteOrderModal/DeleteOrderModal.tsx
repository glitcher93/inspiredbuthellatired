import { useDispatch, useSelector } from "react-redux";
import { closeModal, deleteOrder, getAllOrders, selectDeleteModalStatus } from "../../features/Orders/ordersSlice";
import { AppDispatch, IOrder } from "../../utils/interfaces";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { Box, Button, Modal, Theme, Typography } from "@mui/material";
import { Cancel, Close, Delete } from "@mui/icons-material";

const useStyles = makeStyles((theme: Theme) => ({
    deleteButtons: {
        display: 'flex',
        alignSelf: 'center',
        margin: `${theme.typography.pxToRem(36)} 0`
    }
}))

const DeleteOrderModal = ({order}: {order: IOrder}) => {

    const dispatch = useDispatch<AppDispatch>();

    const classes = useStyles();

    const deleteModalStatus = useSelector(selectDeleteModalStatus);

    const token = localStorage.getItem("token")?.split(' ')[1]!;

    const handleClose = (modal: string) => {
        dispatch(closeModal({modal}));
    }

    const handleDelete = () => {
        dispatch(deleteOrder({token, id: order.id}))
            .then(() => {
                handleClose("delete");
                toast.success("Order Successfully Deleted!");
                dispatch(getAllOrders({token}))
            })
            .catch(() => {
                toast.error("Order is not fulilled and can't be deleted")
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
                <Close 
                sx={(theme) => ({
                    alignSelf: 'flex-end',
                    cursor: 'pointer'
                })}
                onClick={() => handleClose("delete")}
                />
                <Typography
                variant='h4'
                sx={(theme) => ({
                    fontFamily: 'Nunito Sans',
                    fontSize: theme.typography.pxToRem(18)
                })}
                >
                    Delete Order?
                </Typography>
                <Typography
                sx={(theme) => ({
                    marginTop: theme.typography.pxToRem(24),
                    textAlign: 'center'
                })}
                >
                    Are you sure you want to delete this order? (This action cannot be undone)
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
 
export default DeleteOrderModal;