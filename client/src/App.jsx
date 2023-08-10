import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/main/Main'
import Members from "./components/members/Members";
import Calendar from "./components/calendar/Calendar";
import Contact from "./components/contact/Contact";
import Outreach from "./components/outreach/Outreach";
import Sponsor from "./components/sponsor/Sponsor";
import Join from "./components/join/Join";
import './index.css'



function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/about" element={<Main/>}/>
            <Route path="/members" element={<Members/>}/>
            <Route path="/outreach" element={<Outreach/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/sponsor" element={<Sponsor/>}/>
            <Route path="/join" element={<Join/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App