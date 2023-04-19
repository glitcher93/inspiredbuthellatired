import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IItem } from "../../utils/interfaces";
import { changeField, clearFields, closeModal, editProduct, getProducts, loadFields, selectEditModalStatus, selectImage, selectImageError, selectInStock, selectInStockError, selectPrice, selectPriceError, selectSize, selectSizeError, selectTitle, selectTitleError, selectType, selectTypeError, toggleError } from "../../features/AdminProductsGrid/adminProductsGridSlice";
import { Box, Button, FormControl, IconButton, Input, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, Theme, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { makeStyles } from "@mui/styles";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        display: "flex",
        flexDirection: "column"
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            margin: `${theme.typography.pxToRem(16)} 0`,
            '&:nth-of-type(3)': {
                marginTop: 0
            },
            '&:last-of-type': {
                marginTop: 0,
                marginBottom: theme.typography.pxToRem(16)
            }
        }
    }
}))

const EditProductModal = ({item}: {item: IItem}) => {

    const dispatch = useDispatch<AppDispatch>();

    const formRef = useRef<HTMLFormElement>(null);

    const classes = useStyles();

    const editModalStatus = useSelector(selectEditModalStatus);
    const title = useSelector(selectTitle);
    const titleErr = useSelector(selectTitleError);
    const image = useSelector(selectImage);
    const imageErr = useSelector(selectImageError);
    const size = useSelector(selectSize);
    const sizeErr = useSelector(selectSizeError);
    const price = useSelector(selectPrice);
    const priceErr = useSelector(selectPriceError);
    const type = useSelector(selectType);
    const typeErr = useSelector(selectTypeError);
    const inStock = useSelector(selectInStock);
    const inStockErr = useSelector(selectInStockError);

    const token = localStorage.getItem("token")?.split(' ')[1]!;

    const handleClose = (modal: string) => {
        dispatch(closeModal({modal}))
        dispatch(clearFields());
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target

        dispatch(changeField({name, value}));
    }

    const handleEdit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title) {
            dispatch(toggleError({name: 'title'}))
        }

        if (!image) {
            dispatch(toggleError({name: 'image'}))
        }

        if (!size) {
            dispatch(toggleError({name: 'size'}))
        }

        if (!price) {
            dispatch(toggleError({name: 'price'}))
        }

        if (!type) {
            dispatch(toggleError({name: 'type'}))
        }

        if (!inStock) {
            dispatch(toggleError({name: 'inStock'}))
        }

        if (!title || !image || !size || !price || !type || !inStock) {
            return;
        }

        const formData = new FormData(formRef.current!);

        dispatch(editProduct({token, id: item.id, formData}))
            .unwrap()
            .then(() => {
                handleClose("edit");
                dispatch(getProducts({token}))
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Product Edited!',
                            timer: 2000,
                            showConfirmButton: false
                        })
                    })
                    .catch(err => console.log(err))
            })
            .catch(() => {
                handleClose('edit');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong when trying to add this product'
                })
            })
    }
    
    useEffect(() => {
        dispatch(loadFields({item}));
    }, [dispatch, item])

    return (
        <Modal
        open={editModalStatus}
        onClose={() => handleClose("edit")}
        >
            <Box
            sx={theme => ({
                position: "absolute" as 'absolute',
                top: "50%",
                left: "50%",
                transform: 'translate(-50%, -50%)',
                backgroundColor: "#FFF",
                width: "95vw",
                maxWidth: theme.typography.pxToRem(500),
                height: theme.typography.pxToRem(600),
                display: "flex",
                flexDirection: "column",
                padding: theme.typography.pxToRem(16),
                borderRadius: theme.typography.pxToRem(4),
                outline: "none",
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                    width: `${theme.typography.pxToRem(10)}`
                },
                '&::-webkit-scrollbar-track': {
                    margin: theme.typography.pxToRem(8),
                    borderRadius: `${theme.typography.pxToRem(4)}`,
                    backgroundColor: 'rgba(0, 0, 0, 0.35)'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: "#000",
                    borderRadius: `${theme.typography.pxToRem(10)}`
                },
                [theme.breakpoints.up('md')]: {
                    maxWidth: theme.typography.pxToRem(650),
                    padding: `${theme.typography.pxToRem(24)}`,
                }
            })}
            >
                <IconButton
                sx={(theme) => ({
                    alignSelf: "flex-end"
                })}
                onClick={() => handleClose("edit")}
                >
                    <Close />
                </IconButton>
                <Typography
                variant="h2"
                sx={(theme) => ({
                    fontFamily: 'Nunito Sans',
                    fontSize: theme.typography.pxToRem(18),
                    margin: `${theme.typography.pxToRem(16)} 0`,
                    [theme.breakpoints.up('md')]: {
                        fontSize: theme.typography.pxToRem(22)
                    }
                })}
                >
                    Edit Product
                </Typography>
                <form 
                encType="multipart/form-data"
                action={`/admin/products/edit-product/${item.id}`}
                ref={formRef}
                className={classes.form}
                onSubmit={handleEdit}
                >
                    <div>
                        <InputLabel
                        htmlFor="image"
                        sx={(theme) => ({
                            marginBottom: theme.typography.pxToRem(8)
                        })}
                        >
                            Image
                        </InputLabel>
                        <Input 
                        type="file"
                        id="image"
                        name="image"
                        value={image}
                        onChange={handleChange}
                        error={imageErr}
                        sx={(theme) => ({
                            "& .MuiInput-input": {
                                height: "auto"
                            }
                        })}
                        disableUnderline
                        />
                    </div>
                    <div
                    className={classes.formGroup}
                    >
                        <TextField
                        label="Title"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        error={titleErr}
                        sx={(theme) => ({
                            width: '100%',
                            margin: `${theme.typography.pxToRem(16)} 0`,
                            [theme.breakpoints.up('md')]: {
                                margin: 0,
                                marginRight: theme.typography.pxToRem(8),
                                width: `calc(50% - ${theme.typography.pxToRem(8)})`,
                            }
                        })}
                        />
                        <TextField
                        label="Size"
                        name="size"
                        value={size}
                        onChange={handleChange}
                        error={sizeErr}
                        sx={(theme) => ({
                            width: '100%',
                            marginBottom: theme.typography.pxToRem(16),
                            [theme.breakpoints.up('md')]: {
                                margin: 0,
                                width: `50%`,
                            }
                        })}
                        />
                    </div>
                    <div
                    className={classes.formGroup}
                    >
                        <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={price}
                        onChange={handleChange}
                        error={priceErr}
                        inputProps={{
                            min: 1,
                            step: ".01"
                        }}
                        sx={(theme) => ({
                            width: '100%',
                            marginBottom: theme.typography.pxToRem(16),
                            [theme.breakpoints.up('md')]: {
                                margin: 0,
                                marginRight: theme.typography.pxToRem(8),
                                width: `calc(50% - ${theme.typography.pxToRem(8)})`,
                            }
                        })}
                        />
                        <FormControl
                        sx={(theme) => ({
                            width: "100%",
                            marginBottom: theme.typography.pxToRem(16),
                            [theme.breakpoints.up('md')]: {
                                margin: 0,
                                width: '50%'
                            }
                        })}
                        >
                            <InputLabel
                            id="type"
                            >
                                Type
                            </InputLabel>
                            <Select 
                            labelId="type"
                            label="Type"
                            name="type"
                            value={type}
                            onChange={handleChange}
                            error={typeErr}
                            >
                                <MenuItem disabled value="">Choose a type</MenuItem>
                                <MenuItem value="Painting">Painting</MenuItem>
                                <MenuItem value="Print">Print</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div
                    className={classes.formGroup}
                    >
                        <FormControl
                        sx={(theme) => ({
                            width: "100%",
                            marginBottom: theme.typography.pxToRem(16),
                            [theme.breakpoints.up('md')]: {
                                margin: 0,
                                width: '50%'
                            }
                        })}
                        >
                            <InputLabel
                            id="inStock"
                            >
                                Product In Stock?
                            </InputLabel>
                            <Select 
                            labelId="inStock"
                            label="Product In Stock?"
                            name="inStock"
                            value={inStock}
                            onChange={handleChange}
                            error={inStockErr}
                            >
                                <MenuItem value="true">Yes</MenuItem>
                                <MenuItem value="false">No</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Button
                    type="submit"
                    variant="contained"
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}
 
export default EditProductModal;