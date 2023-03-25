import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ListGroup, Table, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';

import './EmployeeRow.css'

export default function EmployeeRow(props) {
    const { Id, Position, ShirtName, ShirtNumber, Games, Goals, Assists, CleenSheets, Employees } = props.employee;
    const { loading, request, error } = useHttp();
    const params = useParams();

    const [name, setName] = useState(Employees.Name);
    const [surname, setSurname] = useState(Employees.Surname);
    const [position, setPosition] = useState(Position);
    const [shirtName, setShirtName] = useState(ShirtName);
    const [shirtNumber, setShirtNumber] = useState(ShirtNumber);
    const [games, setGames] = useState(Games);
    const [goals, setGoals] = useState(Goals);
    const [assists, setAssists] = useState(Assists);
    const [cleenSheets, setCleenSheets] = useState(CleenSheets);
    const [age, setAge] = useState(null);
    const [birthDate, setBirthDate] = useState(Employees.BirthDate);
    const [country, setCountry] = useState(Employees.Country);

    async function editFootballerHandler() {
        const diff = Math.abs(new Date().getTime() - new Date(birthDate).getTime());
        const years = Math.round(diff / (1000 * 60 * 60 * 24 * 365));

        const result = await request(`http://127.0.0.1:3000/squad/${Id}`, 'PUT', {
            name,
            surname,
            position,
            shirtNumber,
            shirtName,
            age: years,
            birthDate: new Date(birthDate).toISOString(),
            country
        });

        alert(result.message);
    }

    async function deleteFootballerHandler() {
        const result = await request(`http://127.0.0.1:3000/squad/${Id}`, 'DELETE');

        alert(result.message);
    }

    return (
        <tr>
            <td><input className='employee-row' type='text' value={name} onChange={event => setName(event.target.value)} /></td>
            <td><input className='employee-row' type='text' value={surname} onChange={event => setSurname(event.target.value)} /></td>
            <td><input className='employee-row' type='text' value={position} onChange={event => setPosition(event.target.value)} /></td>
            <td><input className='employee-row' type='text' value={shirtName} onChange={event => setShirtName(event.target.value)} /></td>
            <td><input className='employee-row' type='number' value={shirtNumber} onChange={event => setShirtNumber(event.target.value)} /></td>
            <td><input className='employee-row' type='number' value={games} onChange={event => setGames(event.target.value)} /></td>
            <td><input className='employee-row' type='number' value={goals} onChange={event => setGoals(event.target.value)} /></td>
            <td><input className='employee-row' type='number' value={assists} onChange={event => setAssists(event.target.value)} /></td>
            <td><input className='employee-row' type='number' value={cleenSheets} onChange={event => setCleenSheets(event.target.value)} /></td>
            <td><input className='employee-row' type='date' value={`${new Date(birthDate).getFullYear()}-${new Date(birthDate).getMonth() + 1 >= 10 ? new Date(birthDate).getMonth() + 1 : '0' + (new Date(birthDate).getMonth() + 1)}-${new Date(birthDate).getDate() < 10 ? '0' + new Date(birthDate).getDate() : new Date(birthDate).getDate()}`} onChange={event => setBirthDate(event.target.value)} /></td>
            <td><input className='employee-row' type='text' value={country} onChange={event => setCountry(event.target.value)} /></td>
            <td>
                <ButtonGroup>
                    <Button variant='secondary' onClick={editFootballerHandler}>Edit</Button>
                    <Button variant='danger' onClick={deleteFootballerHandler}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}
