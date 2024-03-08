import React, { useContext, useState } from "react";
import {Button, Form, Container} from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signin = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {store, actions} = useContext(Context)

    const handleClick = async () => {
        const dataToSend = {
            email: email,
            password: password
        }
        const url = process.env.backend_url = '/api/signin'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }

        const response = await fetch(url, options);
        if (!response.ok) {
            console.error('Error!: ', response.status, response.message)
            return
        }
        const data = await response.json()
        console.log(data)
    }


    return (
        store.isLogin ? <Navigate to="/"/> : 
        <Container className="bg-dark-subtle border rounded-5 p-2 my-5" style={{ maxWidth: '50%' }}>
            <Form>
                <Form.Group className="my-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email} onChange={(event) => setEmail(event.target.value)} name="email" type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(event) => setPassword(event.target.value)} name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="text-center mt-5">
                    <Button className="mx-2 px-2" variant="danger" type="reset">
                        Back
                    </Button>
                    <Button className="mx-2 px-2" onClick={handleClick} variant="success" type="submit">
                        Login
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    )
}