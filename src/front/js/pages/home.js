import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Container, ListGroup } from "react-bootstrap";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			<h1 className="text-center">Web terminada</h1>
			<p style={{ maxWidth: '50%' }}>
				<h3>Caracteristicas:</h3>
				<ListGroup>
					<ListGroup.Item>Signup y Signin (register y login) por medio de Modals</ListGroup.Item>
					<ListGroup.Item>Pagina de perfiles accesibles a todo el mundo</ListGroup.Item>
					<ListGroup.Item>Boton de perfil que te lleva al perfil logueado</ListGroup.Item>
					<ListGroup.Item>Boton para editar perfil siempre que estes logueado y en tu perfil (No edita realmente)</ListGroup.Item>
				</ListGroup>
			</p>
		</Container>
	);
};
