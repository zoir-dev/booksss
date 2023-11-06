import { Button, Card, FormControl, FormControlLabel, Modal, TextField } from '@mui/material'
import close from '../../assets/close.png'
import { ModalFormValues } from './typing';
import { useForm } from 'react-hook-form';

const BooksModal = ({ open, setOpen }: { open: boolean, setOpen: (val: boolean) => void }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<ModalFormValues>();

    const onSubmit = (data: ModalFormValues) => {
        console.log(data);
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
                            error={errors[namee] ?? false}
                            helperText={errors[namee] && errors[namee].message}
                            placeholder={`Enter your ${namee}`}
                            fullWidth
                            type={label === 'Published' ? 'year' : ''}
                        />}
                />
            </FormControl>
        );
    };

    return (
        <Modal open={open} style={{ display: 'grid', placeItems: 'center' }}>
            <Card className='modal_card'>
                <div className="title">
                    <h3>Create a book</h3>
                    <img src={close} alt="" onClick={() => setOpen(false)} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="auth_form">
                    {renderFormControl('title', 'Title',
                        { required: 'Title is required' })}
                    {renderFormControl('author', 'Author',
                        { required: 'Author is required' })}
                    {renderFormControl('cover', 'Cover',
                        { required: ('Cover is required') })}
                    {renderFormControl('published', 'Published',
                        { required: ('Published is required'), })}
                    {renderFormControl('pages', 'Pages',
                        { required: ('Pages is required'), })}
                    <div className="action_buttons">
                        <Button
                            fullWidth
                            className='main_button_outlined'
                            variant='outlined'
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </Button>
                        <Button
                            fullWidth
                            className='main_button'
                            variant='contained'
                            type='submit'
                        >
                            Add
                        </Button>
                    </div>
                </form>
            </Card>

        </Modal>
    )
}

export default BooksModal