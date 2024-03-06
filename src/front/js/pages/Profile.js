import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

export const Profile = () => {

    const params = useParams();

    return (
        <Container>
            <Row className="mt-5">
                <Col md={4}>
                    <Image src={"https://placehold.co/400"} roundedCircle fluid />
                </Col>
                <Col md={8}>
                    <h2>{params.usuario}</h2>
                    <p>Email: {"Esto es un email"}</p>
                    <p>Redes: {"Trabajar mas esto"}</p>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Button variant="primary">Editar Perfil</Button>
                </Col>
            </Row>
        </Container>
    )
}