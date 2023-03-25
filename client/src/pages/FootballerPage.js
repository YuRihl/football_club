import React from "react";
import { useState, useEffect } from "react";
import { Card, ListGroup, Nav } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useHttp } from "../hooks/useHttp";

export default function FootballerPage() {
    const { loading, request, error } = useHttp();
    const params = useParams();
    const [footballer, setFootballer] = useState({});

    useEffect(() => {
        async function fetchFootballer() {
            setFootballer(await request(`http://127.0.0.1:3000/squad/${params.id}`, 'GET'));
        }

        fetchFootballer();
    }, []);



    return (
        <div style={{ margin: 'auto', width: '70%', marginTop: '30px' }}>
            <Card className="bg-dark text-white">
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey={`/squad/${footballer?.Id}`}>
                        <Nav.Item>
                            <Nav.Link href={`/squad/${footballer?.Id}`}>Footballer</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href={`/squad/${footballer?.Id}/contracts`}>Contracts</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href={`/squad/${footballer?.Id}/transfer`}>Transfers</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card.Img src={`./../assets/${footballer?.Id}.jpg`} style={{ opacity: '0.15' }} />
                    <Card.ImgOverlay style={{ top: '60px', left: '10px' }}>
                        <Card.Title style={{fontSize: 40}}>{footballer?.Employees?.Name + ' ' + footballer?.Employees?.Surname}</Card.Title>
                        <Card.Text style={{fontSize: 25}}>Age: {footballer?.Employees?.Age}</Card.Text>
                        <Card.Text style={{fontSize: 25}}>Position: {footballer?.Position}</Card.Text>
                        <Card.Text style={{fontSize: 25}}>Games: {footballer?.Games}</Card.Text>
                        <Card.Text style={{fontSize: 25}}>Goals: {footballer?.Goals}</Card.Text>
                        <Card.Text style={{fontSize: 25}}>Assists: {footballer?.Assists}</Card.Text>
                    </Card.ImgOverlay>
                </Card.Body>
            </Card>
        </div>
    );
}