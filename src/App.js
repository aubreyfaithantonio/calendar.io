import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import EventForm from './pages/EventForm';
import { DateProvider } from './DateContext';

function App() {

  const currentDate = getCurrentDate()

  function getCurrentDate() {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    return yyyy + '-' + mm + '-' + dd
  }

  return (
    <>
      <DateProvider value={{currentDate}}>
        <Router>
          <AppNavbar/>
          <div className="main-container" >
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/form/:event_id" element={<EventForm/>}/>
            </Routes>
          </div>
        </Router>
      </DateProvider>
    </>
  );
}

export default App;
