import React, { useEffect, useState } from 'react'
import styles from "./ContactList.module.css"
import { Link } from 'react-router-dom'
import { ContactService } from '../../services/ContactService'
import Spinner from '../spinner/Spinner';


export default function ContactList() {

	const [query, setQuery] =  useState({
		text: ""
	})

	const [data, setData] = useState({
		loading: false,
		contacts: [],
		filteredContacts: [],
		errMessage: ""
	})

	useEffect(() => {

		const getComments = async () => {
			try {
				setData({
					...data,
					loading: true
				})
				let res = await ContactService.getAllContacts();
				// console.log(res.data);
				setData({
					...data,
					loading: false,
					contacts: res.data,
					filteredContacts: res.data
				})
			}
			catch (err) {
				setData({
					...data,
					loading: false,
					errMessage: err.message
				})

			}
		}

		getComments()

	}, [])




	const deleteContact = async (contactId) => {
		try{
			let res = await ContactService.deleteContact(contactId)
			if(res) {
				setData({
					...data,
					loading: true
				})
				let res = await ContactService.getAllContacts();
				setData({
					...data,
					loading: false,
					contacts: res.data,
					filteredContacts: res.data
				})
			}

		}
		catch(err) {
			setData({
				...data,
				loading: false,
				errMessage: err.message
			})
		}
	}





const searchContacts = (e) => {
setQuery({	...query,	text: e.target.value })

let searchContacts = data.contacts.filter( contact => {
	return contact.name.toLowerCase().includes(e.target.value.toLowerCase())
})

setData({
	...data,
	filteredContacts: searchContacts
})

}



	let { loading, contacts, errMessage, filteredContacts } = data

	return (
		<>
			<section className={styles.topSection}>
				<form className={styles.searchContainer}>
					<input
					name='text'
					value={query.text}
					onChange={searchContacts}
						type="text"
						placeholder='Search names...'
						className={styles.searchBar} />
					<input type="submit" value="Search" className={styles.searchBtn} />
					<br />
				</form>
				<Link to='/contacts/add' className={styles.addBtn}> + Add Contact </Link>
			</section>



			{loading ? <Spinner /> :
				<>
					{filteredContacts.length > 0 && filteredContacts.map((contact) => {
						return (
							<section key={contact.id}>
								<div className={styles.card}>
									<div className={styles.contact} >
										<p className={styles.label}> Name: <span className={styles.span}> {contact.name} </span> </p>
										<p className={styles.label}> Phone:<span className={styles.span}> {contact.phone} </span> </p>
										<p className={styles.label}> Email:<span className={styles.span}> {contact.email}</span> </p>
									</div>

									<div className={styles.cardBtns}>
										<Link to={`/contacts/view/${contact.id}`} className={styles.detail}> View Detail </Link>
										<Link to={`/contacts/edit/${contact.id} `}className={styles.edit}> Edit </Link>
										<button className={styles.delete} onClick={() => deleteContact(contact.id)}> Delete </button>
									</div>

								</div>
							</section>
						)

					})}
				</>
			}

		</>
	)
}
