
import { Container } from '@mui/material'
import './App.css'
import Nav from './components/Nav'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NotFound404 from './pages/NotFound404'

function App() {

  return (
    <>
    <Nav/>
      <Container className='glass'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='*' element={<NotFound404/>}/>
        </Routes>
      </Container>
    </>
  )
}

export default App
