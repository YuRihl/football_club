import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ListGroup, Table, Button, ButtonGroup, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';

export default function ContractRow(props) {
    const { ContractSign, ContractExpiration, SalaryPerMonth, SalaryBonuses, ContractId } = props.contract;
    const { loading, request, error } = useHttp();
    const params = useParams();

    const [contractSign, setContractSign] = useState(ContractSign);
    const [contractExpiration, setContractExpiration] = useState(ContractExpiration);
    const [salaryPerMonth, setSalaryPerMonth] = useState(SalaryPerMonth);
    const [salaryBonuses, setSalaryBonuses] = useState(SalaryBonuses);

    async function editContractHandler() {
        const result = await request(`http://127.0.0.1:3000/squad/${params.id}/contracts/${ContractId}`, 'PUT', {
            contractSign: new Date(contractSign).toISOString(),
            contractExpiration: new Date(contractExpiration).toISOString(),
            salaryPerMonth,
            salaryBonuses
        });

        alert(result.message);
    }

    async function deleteContractHandler() {
        const result = await request(`http://127.0.0.1:3000/squad/${params.id}/contracts/${ContractId}`, 'DELETE');

        alert(result.message);
    }

    return (
        <tr>
            <td><input type='date' value={`${new Date(contractSign).getFullYear()}-${new Date(contractSign).getMonth() < 10 ? '0' + new Date(contractSign).getMonth() : new Date(contractSign).getMonth()}-${new Date(contractSign).getDate() < 10 ? '0' + new Date(contractSign).getDate() : new Date(contractSign).getDate()}`}
                onChange={event => setContractSign(event.target.value)}/>
            </td>
            <td><input type='date' value={`${new Date(contractExpiration).getFullYear()}-${new Date(contractExpiration).getMonth() < 10 ? '0' + new Date(contractExpiration).getMonth() : new Date(contractExpiration).getMonth()}-${new Date(contractExpiration).getDate() < 10 ? '0' + new Date(contractExpiration).getDate() : new Date(contractExpiration).getDate()}`}
                onChange={event => setContractExpiration(event.target.value)}/>
            </td>
            <td><input type='number' value={salaryPerMonth} onChange={event => setSalaryPerMonth(event.target.value)} /></td>
            <td><input type='number' value={salaryBonuses} onChange={event => setSalaryBonuses(event.target.value)} /></td>
            <td>
                <ButtonGroup>
                    <Button variant='secondary' onClick={editContractHandler}>Edit</Button>
                    <Button variant='danger' onClick={deleteContractHandler}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}
