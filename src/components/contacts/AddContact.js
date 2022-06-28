import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactService } from '../../services/ContactService'
import styles from './AddContact.module.css'

export default function AddContact() {

	const navigate = useNavigate()

	const [addContacts, setAddContacts] = useState({
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
		setAddContacts({
			...addContacts, 
			contact: {
				...addContacts.contact,
				[e.target.name]: e.target.value
			}
		})
	}


	useEffect(() => {

		const getGroupId = async () => {
			try {
				setAddContacts({...addContacts, loading: true})
				let res = await ContactService.getGroups()
				// console.log(res.data);
				setAddContacts({
					...addContacts, 
					loading: false,
					groups: res.data
				})
			}
			catch (err) {


			}
		}

		getGroupId()

	}, [])



	const submitAddContact = async (e) => {
		e.preventDefault();
		try{
			let res = await ContactService.createContact(addContacts.contact)
			if(res){
				navigate('/contacts/list', {replace: true})
			}
		}
		catch(err) {
			setAddContacts({
				...addContacts, 
				errMessage: err.message
			})
			navigate('/contacts/add', {replace: false})
		}
	}
	



	const {loading, contact, groups, errMessage} = addContacts;

	return (
		<div>

			<form className={styles.addContact} onSubmit={submitAddContact}>
				<h3 className={styles.addTitle}>Create Contact</h3>


				<input name='name'  value={contact.name}  onChange={updateInput}  type="text" placeholder='Name' />
				<input name='phone'  value={contact.phone}  onChange={updateInput}  type="phone" placeholder='Phone' />
				<input name='email'  value={contact.email}  onChange={updateInput}  type="email" placeholder='Email' />
				<input name='company'  value={contact.company}  onChange={updateInput}  type="text" placeholder='Company' />

				<select  name='groupId'  value={contact.groupId}  onChange={updateInput}>
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
					<input type="submit" value="Create" className={styles.createBtn} />
					<Link to="/contacts/list" className={styles.cancelBtn}> Cancel </Link>
				</div>

			</form>


		</div>
	)
}
