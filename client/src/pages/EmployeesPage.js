import { React, useState, useEffect } from 'react'
import { useHttp } from '../hooks/useHttp';
import { useParams } from 'react-router-dom';
import { Button, ButtonGroup, Form, Row, Table, Col } from 'react-bootstrap';
import EmployeeRow from '../components/EmployeeRow';

export default function EmployeesPage() {
    const { loading, request, error } = useHttp();
    const params = useParams();
    const [footballers, setFootballers] = useState([]);

    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [position, setPosition] = useState(null);
    const [shirtName, setShirtName] = useState(null);
    const [shirtNumber, setShirtNumber] = useState(null);
    const [age, setAge] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [country, setCountry] = useState(null);

    const [filterPosition, setFilterPosition] = useState(null);

    useEffect(() => {
        async function fetchFootballers() {
            setFootballers(await request(`http://127.0.0.1:3000/squad`, 'GET'));
        }

        fetchFootballers();
    }, []);


    async function postFootballerHandler() {
        const diff = Math.abs(new Date().getTime() - new Date(birthDate).getTime());
        const years = Math.round(diff / (1000 * 60 * 60 * 24 * 365));

        const result = await request(`http://127.0.0.1:3000/squad`, 'POST', {
            name,
            surname,
            position,
            games: 0,
            goals: 0,
            assists: 0,
            cleenSheets: 0,
            shirtNumber,
            shirtName,
            age: years,
            birthDate: new Date(birthDate).toISOString(),
            country
        });

        alert(result.message);
    }

    async function getFootballersbyFilter(filter, value) {
        if (value === '') setFootballers(await request(`http://127.0.0.1:3000/squad`, 'GET'));
        setFootballers(await request(`http://127.0.0.1:3000/squad?${filter}=${value}`, 'GET'));
    }

    return (
        <div style={{ marginTop: '30px' }}>
            <Form style={{marginBottom: '20px'}}>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor='filterPosition'>By position</Form.Label>
                        <Form.Control type='text' id='filterPosition' onChange={event => getFootballersbyFilter('position', event.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor='filterCountry'>By country</Form.Label>
                        <Form.Control type='text' id='filterCountry' onChange={event => getFootballersbyFilter('country', event.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor='filterGamesMore'>Max Games</Form.Label>
                        <Form.Control type='number' id='filterGamesMore' onChange={event => getFootballersbyFilter('maxGames', event.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor='filterGamesLess'>Min Games</Form.Label>
                        <Form.Control type='number' id='filterGamesLess' onChange={event => getFootballersbyFilter('minGames', event.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor='filterGoalsMore'>Max Goals</Form.Label>
                        <Form.Control type='number' id='filterGoalsMore' onChange={event => getFootballersbyFilter('maxGoals', event.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor='filterGoalsLess'>Min Goals</Form.Label>
                        <Form.Control type='number' id='filterGoalsLess' onChange={event => getFootballersbyFilter('minGoals', event.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor='filterAssistsMore'>Max Assists</Form.Label>
                        <Form.Control type='number' id='filterAssistsMore' onChange={event => getFootballersbyFilter('maxAssists', event.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor='filterAssistsLess'>Min Assists</Form.Label>
                        <Form.Control type='number' id='filterAssistsLess' onChange={event => getFootballersbyFilter('minAssists', event.target.value)} />
                    </Form.Group>
                </Row>
            </Form>
            <Table variant='dark' striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Position</th>
                        <th>Shirt Name</th>
                        <th>Shirt Number</th>
                        <th>Games</th>
                        <th>Goals</th>
                        <th>Assists</th>
                        <th>Cleen Sheets</th>
                        <th>Birthdate</th>
                        <th>Country</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {footballers.map(element => {
                        return <EmployeeRow employee={element} />
                    })}
                    <tr>
                        <td><input className='employee-row' type='text' value={name} onChange={event => setName(event.target.value)} /></td>
                        <td><input className='employee-row' type="text" value={surname} onChange={event => setSurname(event.target.value)} /></td>
                        <td><input className='employee-row' type="text" value={position} onChange={event => setPosition(event.target.value)} /></td>
                        <td><input className='employee-row' type="text" value={shirtName} onChange={event => setShirtName(event.target.value)} /></td>
                        <td><input className='employee-row' type="number" value={shirtNumber} onChange={event => setShirtNumber(event.target.value)} /></td>
                        <td><input className='employee-row' type="number" value={0} disabled /></td>
                        <td><input className='employee-row' type="number" value={0} disabled /></td>
                        <td><input className='employee-row' type="number" value={0} disabled /></td>
                        <td><input className='employee-row' type="number" value={0} disabled /></td>
                        <td><input className='employee-row' type="date" value={birthDate} onChange={event => setBirthDate(event.target.value)} /></td>
                        <td><input className='employee-row' type="text" value={country} onChange={event => setCountry(event.target.value)} /></td>
                        <td><Button variant='success' onClick={postFootballerHandler}>Create</Button></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}
