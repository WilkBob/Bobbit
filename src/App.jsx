import { Container } from '@mui/material'
import './App.css'
import Nav from './components/Nav/Nav'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NotFound404 from './pages/NotFound404'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Logout from './pages/Logout'

function App() {

  return (
    <>
    <Nav/>
      <Container className='glass'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='*' element={<NotFound404/>}/>
        </Routes>
      </Container>
    </>
  )
}

export default App
