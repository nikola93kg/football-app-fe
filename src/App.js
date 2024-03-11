import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import TeamList from './components/team/TeamList';
import AddTeam from "./components/team/AddTeam";
import Navbar from './components/Navbar';
import "./styles/App.css"
import EditTeam from './components/team/EditTeam';
import AddReferee from './components/referee/AddReferee';
import RefereeList from './components/referee/RefereeList';
import EditReferee from './components/referee/EditReferee';
import AddPlayer from './components/player/AddPlayer';
import PlayersList from './components/player/PlayerList';
import EditDeletePlayer from './components/player/EditDeletePlayer';

function App() {
  return (
    <div className='main-container'>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teams" element={<TeamList />} />
        <Route path="/add-team" element={<AddTeam />} />
        <Route path='/edit-team' element={<EditTeam />} />
        <Route path='/referees' element={<RefereeList />} />
        <Route path='/add-referee' element={<AddReferee />} />
        <Route path='/edit-referee' element={<EditReferee />} />
        <Route path='/add-player' element={<AddPlayer />} />
        <Route path='/players' element={<PlayersList />} />
        <Route path='/edit-delete-player' element={<EditDeletePlayer />} />
      </Routes>
    </div>
  )
}

export default App