import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ListGroup, Table, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';

export default function ContractRow(props) {
    const { TransferDate, SignedFrom, TransferSum, Id } = props.transfer;
    const { loading, request, error } = useHttp();
    const params = useParams();

    const [transferDate, setTransferDate] = useState(TransferDate);
    const [signedFrom, setSignedFrom] = useState(SignedFrom);
    const [transferSum, setTransferSum] = useState(TransferSum);

    async function editTransferHandler() {
        const result = await request(`http://127.0.0.1:3000/squad/${params.id}/transfer`, 'PUT', {
            transferDate: new Date(transferDate).toISOString(),
            signedFrom,
            transferSum,
        });

        alert(result.message);
    }

    async function deleteTransferHandler() {
        const result = await request(`http://127.0.0.1:3000/squad/${params.id}/transfer`, 'DELETE');

        alert(result.message);
    }

    return (
        <tr>
            <td><input type='date' value={`${new Date(transferDate).getFullYear()}-${new Date(transferDate).getMonth() < 10 ? '0' + new Date(transferDate).getMonth() : new Date(transferDate).getMonth()}-${new Date(transferDate).getDate() < 10 ? '0' + new Date(transferDate).getDate() : new Date(transferDate).getDate()}`}
                onChange={event => setTransferDate(event.target.value)} />
            </td>
            <td><input type='text' value={signedFrom}
                onChange={event => setSignedFrom(event.target.value)} />
            </td>
            <td><input type='number' value={transferSum} onChange={event => setTransferSum(event.target.value)} /></td>
            <td>
                <ButtonGroup>
                    <Button variant='secondary' onClick={editTransferHandler}>Edit</Button>
                    <Button variant='danger' onClick={deleteTransferHandler}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}
