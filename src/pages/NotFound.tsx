import { Button } from '@mui/material'
import notFound from '../assets/not_found.svg'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="bg not_found">
            <div>
                <img src={notFound} alt="" />
                <div>
                    <Button variant='contained' className='main_button' onClick={() => navigate('/')}>
                        Go Home Page
                    </Button>
                    <Button variant='outlined' className='main_button_outlined' onClick={() => window.location.reload()}>
                        Reload Page
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NotFound