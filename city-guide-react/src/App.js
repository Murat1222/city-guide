import './App.scss'

import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'

import { Route, Routes } from 'react-router-dom'

import Index from './pages/index/Index.js'
import Attractions from './pages/attractions/attractions.js'
import Contact from './pages/contact/contact.js'
import AttractionInfo from './pages/attractionsInfo/AttractionsInfo.js'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/attraction/:id" element={<AttractionInfo />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App