import logo from '../../assets/logoo.png'
import search from '../../assets/search.png'
import bell from '../../assets/bell.png'
import red from '../../assets/red.png'
import user_img from '../../assets/user_img.png'
import './style.css'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate()
    return (
        <div className='header'>
            <div className='header_left'>
                <img src={logo} alt="" />
                <div className="search_div">
                    <img src={search} alt="" />
                    <input placeholder='Search for any training you want' />
                </div>
            </div>
            <div className='header_right'>
                <div className="bell_icon">
                    <img src={bell} alt="" />
                    <img src={red} alt="" />
                </div>
                <div className='user_img' onClick={() => { localStorage.setItem('data', JSON.stringify({ name: '' })), navigate('/sign') }}>
                    <img src="https://picsum.photos/60" loading='lazy' alt="" />
                    <img src={user_img} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Header