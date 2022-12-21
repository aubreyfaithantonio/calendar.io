import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import EventForm from './pages/EventForm';

function App() {
  return (
    <>
      <Router>
          <AppNavbar/>
					<div className="main-container">
						<Routes>
							<Route path="/" element={<Home/>}/>
              <Route path="/form/:event_id" element={<EventForm/>}/>
						</Routes>
					</div>
				</Router>
    </>
  );
}

export default App;
