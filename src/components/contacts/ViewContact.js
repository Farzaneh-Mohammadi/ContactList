import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactService } from '../../services/ContactService';
import Spinner from '../spinner/Spinner';
import styles from "./ViewContact.module.css"

export default function ViewContact() {

	const { contactId } = useParams();

	const [state, setState] = useState({
		loading: false,
		contact: {},
		errMessage: "",
		group: {}
	})

	useEffect(() => {
		const getOneComment = async () => {
			try {
				setState({
					...state,
					loading: true
				})
				let res = await ContactService.getOneContact(contactId);
				let groupRes = await ContactService.getOneGroup(res.data)
				// console.log(res.data);
				setState({
					...state,
					loading: false,
					contact: res.data,
					group: groupRes.data
				})
			}
			catch (err) {
				setState({
					...state,
					loading: false,
					errMessage: err.message
				})

			}
		}

		getOneComment()
	}, [contactId])


	let { loading, contact, errMessage, group } = state;


	return (
		<div>

			<div className={styles.card}>
				<h3 className={styles.detailTitle}> Contact Detail</h3>
				{loading ? <Spinner /> : <>

					<section>
						<div >

							<p className={styles.label}> Name: <span className={styles.span}> {contact.name} </span> </p>
							<p className={styles.label}> Phone:<span className={styles.span}>{contact.phone} </span> </p>
							<p className={styles.label}> Email:<span className={styles.span}> {contact.email}</span> </p>
							<p className={styles.label}> Group:<span className={styles.span}> {group.name}</span> </p>

						</div>

						<div className={styles.backBtnContainer}>
							<Link to="/contacts/list" className={styles.backBtn}> Back </Link>
						</div>
					</section>


				</>}

			</div>

		</div>
	)
}
