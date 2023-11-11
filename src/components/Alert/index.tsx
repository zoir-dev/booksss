import { Alert, AlertColor, Snackbar } from '@mui/material'

interface thisProps {
    open: boolean,
    setOpen: (val: boolean) => void,
    message: string,
    severity: AlertColor | undefined
}

const index = ({ open, setOpen, message, severity = 'error' }: thisProps) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                className={severity === 'error' ? "error_alert" : "success_alert"}
                severity={severity}
            // onClose={() => setOpen(false)}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default index