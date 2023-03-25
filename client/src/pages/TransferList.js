import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ListGroup, Table, Button } from 'react-bootstrap'
import { useHttp } from '../hooks/useHttp';
import TransferRow from '../components/TransferRow';

export default function TransferList() {
    const { loading, request, error } = useHttp();
    const params = useParams();
    const [transfers, setTransfers] = useState([]);

    const [transferDate, setTransferDate] = useState(null);
    const [signedFrom, setSignedFrom] = useState(null);
    const [transferSum, setTransferSum] = useState(null);

    useEffect(() => {
        async function fetchContracts() {
            setTransfers(await request(`http://127.0.0.1:3000/squad/${params.id}/transfer`, 'GET'));
        }

        fetchContracts();
    }, []);

    async function postTransferHandler(){
        const result = await request(`http://127.0.0.1:3000/squad/${params.id}/transfer`, 'POST', {
            transferDate: new Date(transferDate).toISOString(), signedFrom, transferSum
        });

        alert(result.message);
    }

    return (
        <div style={{ margin: 'auto', width: '70%', marginTop: '30px' }}>
            <Table variant='dark' striped bordered hover>
                <thead>
                    <tr>
                        <th>Transfer Date</th>
                        <th>Signed from</th>
                        <th>Transfer Sum</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers.map(element => {
                        return <TransferRow transfer={element} />
                    })}
                    <tr>
                        <td><input type='date' value={transferDate} onChange={event => setTransferDate(event.target.value)}/></td>
                        <td><input type="text" value={signedFrom} onChange={event => setSignedFrom(event.target.value)}/></td>
                        <td><input type="number" value={transferSum} onChange={event => setTransferSum(event.target.value)}/></td>
                        <td><Button variant='success' onClick={postTransferHandler}>Create</Button></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
