import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './websiteComponents/main/Main'
import Members from "./websiteComponents/members/Members";
import Gui from './components/Gui';
import './index.css'
import Calendar from "./websiteComponents/calendar/Calendar";
import Contact from "./websiteComponents/contact/Contact";
import Outreach from "./websiteComponents/outreach/Outreach";
import Sponsor from "./websiteComponents/sponsor/Sponsor";
import Join from "./websiteComponents/join/Join";



function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/gui" element={<Gui/>}/>
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