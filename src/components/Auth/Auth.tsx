import { Alert, Button, Card, Divider, FormControl, FormControlLabel, InputAdornment, Snackbar, TextField } from "@mui/material"
import google from '../../assets/google.png'
import facebook from '../../assets/facebook.png'
import red_close from '../../assets/red_close.png'
import './style.css'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { IFormValues } from "./typing"
import { http } from "../../api/http"
import { useState } from "react"


const Auth = ({ type }: { type?: string }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>();
    const navigate = useNavigate()

    const onSubmit = async (data: IFormValues) => {
        if (window.location.pathname === '/login') {
            setError(true)
            setMessage('Sign In api is not defined')
        } else {
            const dataa = {
                "name": data.name,
                "email": data.email,
                "key": data.username,
                "secret": data.password
            }
            setLoading(true)
            await http.post('/signup', dataa).then((d) => {
                localStorage.setItem('data', JSON.stringify(d.data.data))
                navigate('/')
            }).catch((e) => { setError(true), setMessage(e.response.data.message || "Error occured while authenticating") })
            setLoading(false)
        }
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
                            placeholder={`Enter ${namee}`}
                            fullWidth
                            type={label === 'Password' ? 'password' : ''}
                            InputProps={{
                                style: {
                                    borderColor: errors[namee] ? 'red' : '#EBEBEB',
                                    borderRadius: '6px'
                                },
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                                        {errors[namee] && <img src={red_close} alt="" />}
                                    </InputAdornment>
                                )
                            }}
                        />}
                />
            </FormControl>
        );
    };

    return (
        <div className="bg auth">
            <Card className="card" >
                <h2>
                    {type ? 'Sign up' : 'Sign in'}
                </h2>
                <div className="sign_with">
                    <Button variant="outlined" color="inherit" fullWidth>
                        <img src={google} alt="" />
                        Continue with Google
                    </Button>
                    <Button variant="outlined" color="inherit" fullWidth>
                        <img src={facebook} alt="" />
                        Continue with Facebook
                    </Button>
                </div>
                <Divider orientation="horizontal" flexItem >
                    OR
                </Divider>
                <form onSubmit={handleSubmit(onSubmit)} className="auth_form">
                    {type && renderFormControl('name', 'Name',
                        { required: 'Name is required' })}
                    {type && renderFormControl('username', 'Username',
                        { required: 'Username is required' })}
                    {renderFormControl('email', 'Email',
                        {
                            required: ('Email is required'), pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email format",
                            },
                        })}
                    {renderFormControl('password', 'Password',
                        {
                            required: ('Password is required'), minLength: {
                                value: 6,
                                message: "Password should contain min 6 characters",
                            },
                        })}
                    <div className="button_div">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={`main_button ${loading && 'disabled_button'}`}
                        >
                            {loading ? 'Submitting...' : 'Submit'}

                        </Button>
                        {
                            type ?
                                <p>Have an account?{' '}
                                    <Link to='/login'>
                                        Go to sign in.
                                    </Link>
                                </p>
                                :
                                <p>Already signed up?{' '}
                                    <Link to='/sign'>
                                        Go to sign up.
                                    </Link>
                                </p>
                        }
                    </div>
                </form>
            </Card>
            <Snackbar
                open={error}
                autoHideDuration={5000}
                onClose={() => setError(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert className="error_alert" severity="error">{message}</Alert>
            </Snackbar>
        </div>
    )
}

export default Auth