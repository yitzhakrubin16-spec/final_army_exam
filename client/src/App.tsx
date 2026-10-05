import './App.css'
import { Route, Routes } from 'react-router-dom'
import Alerts from './pages/Alerts'
import MainPage from './pages/MainPage'
import AddAlert from './pages/addAlert'


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/add_alert" element={<AddAlert />} />
    </Routes>
  )
}

export default App
