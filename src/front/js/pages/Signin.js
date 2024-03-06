import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

export const Signin = () => {
    return (
        <Container className="bg-dark-subtle border rounded-5 p-2 my-5" style={{ maxWidth: '50%' }}>
            <Form>
                <Form.Group className="my-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="text-center mt-5">
                    <Button className="mx-2 px-2" variant="danger" type="reset">
                        Back
                    </Button>
                    <Button className="mx-2 px-2" variant="success" type="submit">
                        Login
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    )
}