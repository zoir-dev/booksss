import { Button, Card, FormControl, FormControlLabel, Modal, TextField } from '@mui/material'
import close from '../../assets/close.png'
import { ModalFormValues } from './typing';
import { useForm } from 'react-hook-form';
// import { http } from '../../api/http';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { useState } from 'react';
import Alert from '../Alert'

interface thisProps {
    open: boolean,
    setOpen: (val: boolean) => void,
    fetchBooks: () => void,
    type: string,
    setType: (val: string) => void
}

const BooksModal = ({ open, setOpen, fetchBooks, type, setType }: thisProps) => {
    const [alert, setAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const { register, handleSubmit, formState: { errors }, reset } = useForm<any>();


    const onSubmit = async (data: ModalFormValues) => {
        const userData = localStorage.getItem('data')
        const dataa = JSON.parse(userData ? userData : '')
        const res = 'POST' + `/books` + JSON.stringify({ 'isbn': data.isbn.toString() }) + dataa.secret
        const token = CryptoJS.MD5(res).toString()
        const d = {
            // "id": 21,
            "isbn": data.isbn.toString(),
            // "title": "Raspberry Pi User Guide",
            // "cover": "http://url.to.book.cover",
            // "author": "Eben Upton",
            // "published": 2012,
            // "pages": 221
        }
        setLoading(true)
        await axios.post('https://no23.lavina.tech/books',
            JSON.stringify(d),
            {
                headers: {
                    "Content-Type": "application/json",
                    Key: dataa.key,
                    Sign: token,
                },
            }).then(() => {
                fetchBooks(),
                    reset(),
                    setOpen(false),
                    setAlert(true),
                    setMessage('The Book added successfully!')
            }).catch(e => {
                setMessage(e.response.data.message),
                    setAlert(true)
            })
        setLoading(false)
    }

    const handleClose = () => {
        setOpen(false)
        setType('Add')
        reset()
    }

    const renderFormControl = (namee: string, label: string, validationRules: any) => {
        return (
            <FormControl>
                <FormControlLabel
                    label={label}
                    labelPlacement="top"
                    control={
                        <TextField
                            {...register(namee, validationRules)}
                            error={errors[namee] ? true : false}
                            helperText={errors[namee] && errors[namee]?.message}
                            placeholder={`Enter your ${namee}`}
                            fullWidth
                            type={label === 'Published' ? 'year' : ''}
                        />}
                />
            </FormControl>
        );
    };

    return (
        <>
            <Modal open={open} style={{ display: 'grid', placeItems: 'center' }}>
                <Card className='modal_card'>
                    <div className="title">
                        <h3>{type === 'Add' ? 'Create' : 'Edit'} a book</h3>
                        <img src={close} alt="" onClick={handleClose} />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="auth_form">
                        {renderFormControl('isbn', 'Isbn',
                            { required: 'Isbn is required' })}
                        {/* {renderFormControl('title', 'Title',
                            { required: 'Title is required' })}
                        {renderFormControl('author', 'Author',
                            { required: 'Author is required' })}
                        {renderFormControl('cover', 'Cover',
                            { required: ('Cover is required') })}
                        {renderFormControl('published', 'Published',
                            { required: ('Published is required'), })}
                        {renderFormControl('pages', 'Pages',
                            { required: ('Pages is required'), })} */}
                        <div className="action_buttons">
                            <Button
                                fullWidth
                                className='main_button_outlined'
                                variant='outlined'
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                            <Button
                                fullWidth
                                className={loading ? 'disabled_button' : 'main_button'}
                                variant='contained'
                                type='submit'
                            >
                                {loading ? 'Loading...' : type}
                            </Button>
                        </div>
                    </form>
                </Card>
            </Modal>
            <Alert
                open={alert}
                setOpen={setAlert}
                message={message}
                severity={message.includes('successfully') ? 'success' : 'error'} />
        </>
    )
}

export default BooksModal