import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context)
    const [isUser, setIsUser] = useState(false)
    const [perfil, setPerfil] = useState({
        id: '',
        username: '',
        email: '',
        avatar_url: '',
        is_active: '',
    })

    const params = useParams();

    // Comprueba si hay token almacenado, en ese caso, pide el usuario del token y
    // devuelve "true" si se corresponde con el perfil de usuario actual
    const checkUser = async () => {
        if (localStorage.getItem('access_token')) {
            const user = await actions.getUserLoggedIn()
            if (user.toLowerCase() == params.username.toLowerCase()) {
                setIsUser(true)
            } else setIsUser(false)
        }
    }

    // Pide los datos del perfil a la API
    const getProfile = async () => {
        const profile = await actions.getProfileUser(params.username.toLowerCase())
        setPerfil(profile)
    }

    // Inicializa las 2 funciones cuando el componente se renderiza
    useEffect(() => {
        getProfile()
        checkUser()
    }, []);

    return (

        // En caso de que el perfil no exista en la base de datos te manda a una 404
        !perfil ? <Navigate to='/404' /> :
        <Container>
            <Row className="mt-5">
                <Col md={4}>
                    <Image src={perfil.avatar_url} roundedCircle fluid />
                </Col>
                <Col md={8}>
                    <h2>{perfil.username}</h2>
                    <p>Email: {perfil.email}</p>
                    <p>Usuario activo?: {perfil.is_active ? 'Si' : 'No'}</p>
                </Col>
            </Row>
            
            {/* Renderiza el boton en caso de que el usuario actual sea el del perfil viendose */}
            {store.isLogin && (isUser) ?
                <Row className="mt-3">
                    <Col>
                        <Button onClick={() => alert('Creo que esto ya es pasarse, ¿no?')} variant="primary">Editar Perfil</Button>
                    </Col>
                </Row>
                :
                ''
            }
        </Container>
    )
}