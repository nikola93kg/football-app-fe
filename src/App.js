import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import TeamList from './components/team/TeamList';
import AddTeam from "./components/team/AddTeam";
import Navbar from './components/navigation/Navbar';
import "./styles/App.css"
import EditDeleteTeam from './components/team/EditDeleteTeam';
import AddReferee from './components/referee/AddReferee';
import RefereeList from './components/referee/RefereeList';
import EditDeleteReferee from './components/referee/EditDeleteReferee';
import AddPlayer from './components/player/AddPlayer';
import PlayersList from './components/player/PlayerList';
import EditDeletePlayer from './components/player/EditDeletePlayer';
import CoachList from './components/coach/CoachList';
import AddCoach from './components/coach/AddCoach';
import EditDeleteCoach from './components/coach/EditDeleteCoach';
import TeamListWrapper from './components/team/TeamListWrapper';
import TeamDetails from './components/team/TeamDetails';
import Sidebar from './components/navigation/Sidebar';
import Submenu from './components/navigation/Submenu';

function App() {
  return (
    <div className='main-container'>
      <Navbar />
      {/* <Sidebar /> */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teams" element={<TeamList />} />
        <Route path="/add-team" element={<AddTeam />} />
        <Route path='/edit-team' element={<EditDeleteTeam />} />
        <Route path='/teams/:id' element={<TeamDetails />} />
        <Route path='/referees' element={<RefereeList />} />
        <Route path='/add-referee' element={<AddReferee />} />
        <Route path='/edit-referee' element={<EditDeleteReferee />} />
        <Route path='/add-player' element={<AddPlayer />} />
        <Route path='/players' element={<PlayersList />} />
        <Route path='/edit-delete-player' element={<EditDeletePlayer />} />
        <Route path='/coaches' element={<CoachList />} />
        <Route path='/add-coach' element={<AddCoach />} />
        <Route path='/edit-delete-coach' element={<EditDeleteCoach />} />
      </Routes>
    </div>
  )
}

export default App