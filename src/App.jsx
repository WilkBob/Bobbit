import { Container } from '@mui/material'
import './App.css'
import Nav from './components/Nav/Nav'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NotFound404 from './pages/NotFound404'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Logout from './pages/Logout'
import Post from './pages/Post'
import User from './pages/User'
import Profile from './pages/Profile'
import Waves from './components/Waves'
import Footer from './components/Footer'
import Forums from './pages/Forums'
import Forum from './pages/Forum'
import About from './pages/About'
import Contact from './pages/Contact'
function App() {

  return (
    <>
    
    <Nav/>
      <Waves/>
      <Container className='glass container'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/post/:forumId/:id' element={<Post/>}/>
          <Route path='/user/:id' element={<User/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/Forums' element={<Forums/>}/>
          <Route path='/Forum/:id' element={<Forum/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='*' element={<NotFound404/>}/>
        </Routes>
      </Container>
      <Footer/>
    </>
  )
}

export default App
