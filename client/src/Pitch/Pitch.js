import { React, useEffect, useState } from 'react';
import { Container, Button, ButtonGroup } from 'react-bootstrap';
import { useHttp } from '../hooks/useHttp';
import { Link } from 'react-router-dom';

import './Pitch.css';

export default function Pitch() {
	const { loading, request, error, clearError } = useHttp();
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchFootballers() {
			setData(await request('http://127.0.0.1:3000/squad/', 'GET'));
		}

		fetchFootballers();
	}, []);

	let gk = data.find(element => element.Position === 'GK');

	let rb = data.find(element => element.Position === 'RB');
	let cb1 = data.find(element => element.Position === 'CB');
	let cb2 = data.find(element => element.Position === 'CB' && element !== cb1);
	let lb = data.find(element => element.Position === 'LB');

	let cm1 = data.find(element => element.Position === 'CM');
	let dm = data.find(element => element.Position === 'DM');
	let cm2 = data.find(element => element.Position === 'CM' && element !== cm1);

	let rw = data.find(element => element.Position === 'RW');
	let cs = data.find(element => element.Position === 'CS');
	let lw = data.find(element => element.Position === 'LW');

	return (
		<Container className='pitch'>
			<Link to={gk?.Id + ''} className='player gk'>
				<span>{gk?.ShirtNumber}</span><br />
				<span>{gk?.ShirtName}</span>
			</Link>
			<Link to={rb?.Id + ''} className='player rb'>
				<span>{rb?.ShirtNumber}</span><br />
				<span>{rb?.ShirtName}</span>
			</Link>
			<Link to={cb1?.Id + ''} className='player cb1'>
				<span>{cb1?.ShirtNumber}</span><br />
				<span>{cb1?.ShirtName}</span>
			</Link>
			<Link to={cb2?.Id + ''} className='player cb2'>
				<span>{cb2?.ShirtNumber}</span><br />
				<span>{cb2?.ShirtName}</span>
			</Link>
			<Link to={lb?.Id + ''} className='player lb'>
				<span>{lb?.ShirtNumber}</span><br />
				<span>{lb?.ShirtName}</span>
			</Link>
			<Link to={cm1?.Id + ''} className='player cm1'>
				<span>{cm1?.ShirtNumber}</span><br />
				<span>{cm1?.ShirtName}</span>
			</Link>
			<Link to={dm?.Id + ''} className='player dm'>
				<span>{dm?.ShirtNumber}</span><br />
				<span>{dm?.ShirtName}</span>
			</Link>
			<Link to={cm2?.Id + ''} className='player cm2'>
				<span>{cm2?.ShirtNumber}</span><br />
				<span>{cm2?.ShirtName}</span>
			</Link>
			<Link to={rw?.Id + ''} className='player rw'>
				<span>{rw?.ShirtNumber}</span><br />
				<span>{rw?.ShirtName}</span>
			</Link>
			<Link to={cs?.Id + ''} className='player cs'>
				<span>{cs?.ShirtNumber}</span><br />
				<span>{cs?.ShirtName}</span>
			</Link>
			<Link to={lw?.Id + ''} className='player lw'>
				<span>{lw?.ShirtNumber}</span><br />
				<span>{lw?.ShirtName}</span>
			</Link>
		</Container>
	)
}
