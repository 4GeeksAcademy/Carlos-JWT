import React, { useContext } from "react";
import { Context } from '../store/appContext'
import { Link, useNavigate } from "react-router-dom";
import { Signup } from "./Signup";
import { Signin } from "./Signin";

export const Navbar = () => {
	const { store, actions } = useContext(Context)

	const navigate = useNavigate()	

	// Pide el usuario logeado por el token y lo manda a ese perfil
	const handleProfile = async () => {
		navigate("/profile/"+await actions.getUserLoggedIn())
	}

	// Borra el token y te manda a la raiz
	const handleSignout = async () => {
		actions.signedOut()
		navigate("/")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.isLogin ?
						<button onClick={() => handleProfile()} className="btn mx-2 btn-dark">Profile</button>
						:
						<button onClick={() => actions.showModalSignin(true)} className="btn mx-2 btn-primary">Login</button>
					}

					{store.isLogin ?
						<button onClick={() => handleSignout()} className="btn mx-2 btn-primary">Logout</button>
						:
						<button onClick={() => actions.showModalSignup(true)} className="btn mx-2 btn-primary">Sign up</button>
					}
				</div>
			</div>

			{/* Modals */}
			<Signup />
			<Signin />
		</nav>
	);
};
