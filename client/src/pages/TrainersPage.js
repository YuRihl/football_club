import { React, useState, useEffect } from 'react'
import { useHttp } from '../hooks/useHttp';
import { useParams } from 'react-router-dom';
import { Button, ButtonGroup, Form, Row, Table, Col } from 'react-bootstrap';
import TrainerRow from '../components/TrainerRow';

export default function TrainersPage() {
    const { loading, request, error } = useHttp();
    const params = useParams();
    const [trainers, setTrainers] = useState([]);

    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [age, setAge] = useState(null);
    const [type, setType] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        async function fetchTrainers() {
            setTrainers(await request(`http://127.0.0.1:3000/trainers`, 'GET'));
        }

        fetchTrainers();
    }, []);

    async function postTrainerHandler() {
        const diff = Math.abs(new Date().getTime() - new Date(birthDate).getTime());
        const years = Math.round(diff / (1000 * 60 * 60 * 24 * 365));

        const result = await request(`http://127.0.0.1:3000/trainers`, 'POST', {
            name,
            surname,
            type,
            age: years,
            birthDate: new Date(birthDate).toISOString(),
            country
        });

        alert(result.message);
    }

    async function getTrainerssbyFilter(filter, value) {
        if (value === '') setTrainers(await request(`http://127.0.0.1:3000/trainers`, 'GET'));
        setTrainers(await request(`http://127.0.0.1:3000/trainers?${filter}=${value}`, 'GET'));
    }

    return (
        <div style={{ marginTop: '30px' }}>
            <Form style={{marginBottom: '20px'}}>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor='filterType'>By type</Form.Label>
                        <Form.Control type='text' id='filterType' onChange={event => getTrainerssbyFilter('type', event.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor='filterCountry'>By country</Form.Label>
                        <Form.Control type='text' id='filterCountry' onChange={event => getTrainerssbyFilter('country', event.target.value)} />
                    </Form.Group>
                </Row>
            </Form>
            <Table variant='dark' striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Type</th>
                        <th>Age</th>
                        <th>Birthdate</th>
                        <th>Country</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trainers.map(element => {
                        return <TrainerRow trainer={element} />
                    })}
                    <tr>
                        <td><input className='employee-row' type='text' value={name} onChange={event => setName(event.target.value)} /></td>
                        <td><input className='employee-row' type="text" value={surname} onChange={event => setSurname(event.target.value)} /></td>
                        <td><input className='employee-row' type="text" value={type} onChange={event => setType(event.target.value)} /></td>
                        <td><input className='employee-row' type="number" value={0} disabled/></td>

                        <td><input className='employee-row' type="date" value={birthDate} onChange={event => setBirthDate(event.target.value)} /></td>
                        <td><input className='employee-row' type="text" value={country} onChange={event => setCountry(event.target.value)} /></td>
                        <td><Button variant='success' onClick={postTrainerHandler}>Create</Button></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}
