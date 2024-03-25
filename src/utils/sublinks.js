import { FaCreditCard, FaBook, FaBriefcase } from 'react-icons/fa';

const sublinks = [
  {
    page: 'Home',
    url: '/',
    submenu: []
  },
  {
    page: 'Teams',
    url: '/teams',
    submenu: [
      { label: 'Add Team', icon: <FaCreditCard />, url: '/add-team' },
      { label: 'Edit / Delete Team', icon: <FaCreditCard />, url: '/edit-team' },
    ]
  },
  {
    page: 'Referees',
    url: '/referees',
    submenu: [
      { label: 'Add Referee', icon: <FaBook />, url: '/add-referee' },
      { label: 'Edit / Delete Referee', icon: <FaBook />, url: '/edit-referee' },
    ]
  },
  {
    page: 'Players',
    url: '/players',
    submenu: [
      { label: 'Add Player', icon: <FaBriefcase />, url: '/add-player' },
      { label: 'Edit / Delete Player', icon: <FaBriefcase />, url: '/edit-delete-player' },
    ]
  },
  {
    page: 'Coaches',
    url: '/coaches',
    submenu: [
      { label: 'Add Coach', icon: <FaCreditCard />, url: '/add-coach' },
      { label: 'Edit / Delete Coach', icon: <FaCreditCard />, url: '/edit-delete-coach' },
    ]
  },
];

export default sublinks;
