
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import AddContact from './components/contacts/AddContact';
import ContactList from './components/contacts/ContactList';
import EditContact from './components/contacts/EditContact';
import ViewContact from './components/contacts/ViewContact';
import Navbar from './components/navbar/Navbar';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path='/' element={<Navigate to={'/contacts/list'} />} />
				<Route path='/contacts/list' element={<ContactList />} />
				<Route path='/contacts/add' element={<AddContact />} />
				<Route path='/contacts/view/:contactId' element={<ViewContact />} />
				<Route path='/contacts/edit/:contactId' element={<EditContact />} />
			</Routes>
		</div>
	);
}

export default App;
