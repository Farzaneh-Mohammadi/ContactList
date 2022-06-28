import React from 'react'
import spinnerImg from '../../assets/img/loading2.gif'
import "./Spinner.css"

export default function Spinner() {
	return (
		<div className='spinner'>
			<img src={spinnerImg} alt="Loading..." className='spin' />
			<h3 className='loadText'>Loading...</h3>
		</div>
	)
}
