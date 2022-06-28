import React from 'react'
import styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<div>
			<nav className={styles.navbar}>
				<Link to='/' className={styles.navLink}> Contact List </Link>
			</nav>
		</div>
	)
}
