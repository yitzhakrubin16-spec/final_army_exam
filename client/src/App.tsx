import './App.css'
import { Route, Routes } from 'react-router-dom'
import Alerts from './pages/Alerts'
import MainPage from './pages/MainPage'


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/alerts" element={<Alerts />} />
    </Routes>
  )
}

export default App
