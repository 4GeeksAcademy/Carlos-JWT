import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export const ProfileEdit = ({ usuario, actualizarUsuario }) => {

    const params = useParams();
    const [nuevoUsuario, setNuevoUsuario] = useState(usuario);

    const handleChange = (e) => {
        setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar los datos actualizados al servidor
        actualizarUsuario(nuevoUsuario);
    };

    return (
        <Container>
            <h2>Editar Perfil</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formImagen">
                    <Form.Label>URL de la imagen de perfil</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa la URL de la imagen"
                        name="imagen"
                        value={"https://placehold.co/400"}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formUsername">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tu nombre de usuario"
                        name="username"
                        value={params.username}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu dirección de email"
                        name="email"
                        value={"email"}
                        onChange={handleChange}
                    />
                </Form.Group>
                {/* Agrega más campos según tus necesidades */}
                <Button variant="primary" type="submit">
                    Guardar Cambios
                </Button>
            </Form>
        </Container>
    );
};