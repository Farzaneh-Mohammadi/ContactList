


import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactService } from '../../services/ContactService';
import styles from './EditContact.module.css'

export default function EditContact() {

	const { contactId } = useParams();
	const navigate = useNavigate()


	const [editContacts, setEditContacts] = useState({
		loading: false,
		contact: {
			name: "",
			phone: "",
			email: "",
			company: "",
			groupId: ""
		},
		groups: [],
		errMessage: ""
	})


	const updateInput = (e) => {
		setEditContacts({
			...editContacts, 
			contact: {
				...editContacts.contact,
				[e.target.name]: e.target.value
			}
		})
	}



	
	useEffect(() => {

		const geteditable = async () => {
			try {
				setEditContacts({
					...editContacts,
					loading: true
				})
				let res = await ContactService.getOneContact(contactId);
				let groupRes = await ContactService.getGroups()
				// console.log(res.data);
				setEditContacts({
					...editContacts,
					loading: false,
					contact: res.data,
					groups: groupRes.data
				})
			}
			catch (err) {
				setEditContacts({
					...editContacts,
					loading: false,
					errMessage: err.message
				})

			}
		}

		geteditable()
	}, [contactId])



	const submitEditContact = async (e) => {
		e.preventDefault();
		try{
			let res = await ContactService.editContact(editContacts.contact, contactId)
			if(res){
				navigate('/contacts/list', {replace: true})
			}
		}
		catch(err) {
			setEditContacts({
				...editContacts, 
				errMessage: err.message
			})
			navigate(`/contacts/edit/${contactId}`, {replace: false})
		}
	}
	





	const {loading, contact, groups, errMessage} = editContacts;


	return (
		<div>

			<form className={styles.addContact}   onSubmit={submitEditContact}>
				<h3 className={styles.addTitle}>Edit Contact</h3>


				<input name='name'  value={contact.name}  onChange={updateInput} type="text" placeholder='Name' />
				<input name='phone'  value={contact.phone}  onChange={updateInput} type="phone" placeholder='Phone' />
				<input name='email'  value={contact.email}  onChange={updateInput} type="email" placeholder='Email' />
				<input name='company'  value={contact.company}  onChange={updateInput} type="text" placeholder='Company' />

				<select   name='groupId'  value={contact.groupId}  onChange={updateInput} >
					<option value="">Select a Group</option>
					{
						groups.length > 0 && 
						groups.map((group) => {
							return(
								<option key={group.id}  value={group.id} >{group.name}</option>

							)
						})
					} 
				</select>


				<div className={styles.addContactBtns}>
					<input type="submit" value="Update" className={styles.createBtn} />
					<Link to="/contacts/list" className={styles.cancelBtn}> Cancel </Link>
				</div>

			</form>


		</div>
	)
}
