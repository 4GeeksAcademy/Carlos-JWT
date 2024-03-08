import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    /*
    username=data['username'],
    email=data['email'],
    password=data['password'],
    avatar_url=data['avatar_url'],
    is_active=True)
    */
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };

    const { store, actions } = useContext(Context)

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        actions.signin(formData)
    }

    const handleCancel = () => {
        navigate("/")
    }
    return (
        <Container className="bg-dark-subtle border rounded-5 p-2 my-5" style={{ maxWidth: '50%' }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="my-3" controlId="formBasicEmail">
                    <Form.Label>Email address *</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' value={formData.email} onChange={(e) => handleInputChange(e)} required />
                </Form.Group>

                <Form.Group className="my-3" controlId="formBasicPassword">
                    <Form.Label>Password *</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' value={formData.password} onChange={(e) => handleInputChange(e)} required />
                </Form.Group>

                <Form.Group className="text-center mt-5">
                    <Button className="mx-2 px-2" variant="danger" type="button" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button className="mx-2 px-2" variant="success" type="submit">
                        Login
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    )
}