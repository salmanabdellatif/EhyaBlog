import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import HomePage from './pages/home/HomePage'
import ArticlePage from './pages/article/ArticlePage'
import RegisterPage from './pages/register/RegisterPage'
import LoginPage from './pages/login/LoginPage'
import ProfilePage from './pages/profile/ProfilePage'

function App() {
  return (
    <div className='App font-opensans'>
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='/blog/:slug' element={<ArticlePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
