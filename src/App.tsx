
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Sign from './pages/Sign'
import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign' element={<Sign />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>

  )
}

export default App
