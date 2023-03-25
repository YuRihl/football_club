import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ListGroup, Table, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';

import './EmployeeRow.css'

export default function TrainerRow(props) {
    const { Name, Surname, Age, Id, Type, Employees } = props.trainer;
    const { loading, request, error } = useHttp();
    const params = useParams();

    const [name, setName] = useState(Name);
    const [surname, setSurname] = useState(Surname);
    const [type, setType] = useState(Type)
    const [age, setAge] = useState(Age);
    const [birthDate, setBirthDate] = useState(Employees.BirthDate);
    const [country, setCountry] = useState(Employees.Country);

    async function editTrainerHandler() {
        const diff = Math.abs(new Date().getTime() - new Date(birthDate).getTime());
        const years = Math.round(diff / (1000 * 60 * 60 * 24 * 365));

        const result = await request(`http://127.0.0.1:3000/trainers/${Id}`, 'PUT', {
            name,
            surname,
            type,
            age: years,
            birthDate: new Date(birthDate).toISOString(),
            country
        });

        alert(result.message);
    }

    async function deleteTrainerHandler() {
        const result = await request(`http://127.0.0.1:3000/trainers/${Id}`, 'DELETE');

        alert(result.message);
    }

    return (
        <tr>
            <td><input className='employee-row' type='text' value={name} onChange={event => setName(event.target.value)} /></td>
            <td><input className='employee-row' type='text' value={surname} onChange={event => setSurname(event.target.value)} /></td>
            <td><input className='employee-row' type='text' value={type} onChange={event => setType(event.target.value)} /></td>
            <td><input className='employee-row' type='number' value={age} onChange={event => setAge(event.target.value)} disabled/></td>
            <td><input className='employee-row' type='date' value={`${new Date(birthDate).getFullYear()}-${new Date(birthDate).getMonth() + 1 >= 10 ? new Date(birthDate).getMonth() + 1 : '0' + (new Date(birthDate).getMonth() + 1)}-${new Date(birthDate).getDate() < 10 ? '0' + new Date(birthDate).getDate() : new Date(birthDate).getDate()}`} onChange={event => setBirthDate(event.target.value)} /></td>
            <td><input className='employee-row' type='text' value={country} onChange={event => setCountry(event.target.value)} /></td>
            <td>
                <ButtonGroup>
                    <Button variant='secondary' onClick={editTrainerHandler}>Edit</Button>
                    <Button variant='danger' onClick={deleteTrainerHandler}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}
