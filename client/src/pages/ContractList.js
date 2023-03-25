import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Table, Button, ButtonGroup } from 'react-bootstrap'
import { useHttp } from '../hooks/useHttp';
import ContractRow from '../components/ContractRow';

export default function ContractList() {
    const { loading, request, error } = useHttp();
    const params = useParams();
    const [contracts, setContracts] = useState([]);

    const [contractSign, setContractSign] = useState(null);
    const [contractExpiration, setContractExpiration] = useState(null);
    const [salaryPerMonth, setSalaryPerMonth] = useState(null);
    const [salaryBonuses, setSalaryBonuses] = useState(null);

    useEffect(() => {
        async function fetchContracts() {
            setContracts(await request(`http://127.0.0.1:3000/squad/${params.id}/contracts`, 'GET'));
        }

        fetchContracts();
    }, []);

    async function getContractsHandler(){
        setContracts(await request(`http://127.0.0.1:3000/squad/${params.id}/contracts`, 'GET'));
    }

    async function getLastYearContractsHandler(){
        setContracts(await request(`http://127.0.0.1:3000/squad/${params.id}/contracts?lastYear=true`, 'GET'));
    }

    async function getNextYearContractsHandler(){
        setContracts(await request(`http://127.0.0.1:3000/squad/${params.id}/contracts?nextYear=true`, 'GET'));
    }

    async function postContractHandler() {
        const result = await request(`http://127.0.0.1:3000/squad/${params.id}/contracts`, 'POST', {
            contractSign: new Date(contractSign).toISOString(), contractExpiration: new Date(contractExpiration).toISOString(), salaryPerMonth, salaryBonuses
        });

        alert(result.message);
    }

    return (
        <div style={{ margin: 'auto', width: '70%', marginTop: '30px' }}>
            <ButtonGroup>
                <Button variant='dark' onClick={getContractsHandler}>Normal</Button>
                <Button variant='dark' onClick={getLastYearContractsHandler}>Last year</Button>
                <Button variant='dark' onClick={getNextYearContractsHandler}>Next year</Button>
            </ButtonGroup>
            <Table variant='dark' striped bordered hover>
                <thead>
                    <tr>
                        <th>Contract Sign</th>
                        <th>Contract Expiration</th>
                        <th>Salary Per Month</th>
                        <th>Salary Bonuses</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contracts.map(element => {
                        return <ContractRow contract={element} />
                    })}
                    <tr>
                        <td><input type='date' value={contractSign} onChange={event => setContractSign(event.target.value)} /></td>
                        <td><input type="date" value={contractExpiration} onChange={event => setContractExpiration(event.target.value)} /></td>
                        <td><input type="number" value={salaryPerMonth} onChange={event => setSalaryPerMonth(event.target.value)} /></td>
                        <td><input type="number" value={salaryBonuses} onChange={event => setSalaryBonuses(event.target.value)} /></td>
                        <td><Button variant='success' onClick={postContractHandler}>Create</Button></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
