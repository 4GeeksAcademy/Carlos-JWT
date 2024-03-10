const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			results: null,
			isLogin: false,
			showModalSignup: false,
			showModalSignin: false
		},
		actions: {
			APICall: async (url, options) => {
				try {
					const response = await fetch(url, options);
					if (!response.ok) {
						console.error('Error: ' + response.status, response.statusText);
						return response.status;
					}
					return await response.json();
				} catch (error) {
					console.error('Error in fetch:', error);
					return null;
				}
			},

			signin: async (data) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
				const response = await getActions().APICall(process.env.BACKEND_URL + '/api/signin/', options);
				if (response.access_token != undefined) {
					getActions().signedIn()
					localStorage.setItem('access_token', response.access_token)
				} else console.error('Algo salio mal, no se el que, pero algo', response)
			},

			signup: async (data) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
				return await getActions().APICall(process.env.BACKEND_URL + '/api/signup/', options)
			},

			getProfileUser: async (user) => {
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					}
				}
				const response = await getActions().APICall(process.env.BACKEND_URL + '/api/profile/' + user, options)
				return response.results
			},

			getUserLoggedIn: async () => {
				if (localStorage.getItem('access_token')){
					const options = {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
						}
					}
					const response = await getActions().APICall(process.env.BACKEND_URL + '/api/profile/check', options)
					return response.results
				} else return 'None'
			},

			signedIn: () => {
				setStore({ isLogin: true });
			},

			signedOut: () => {
				localStorage.removeItem('access_token')
				setStore({ isLogin: false });
			},

			showModalSignin: (value) => {
				setStore({ showModalSignin: value });
			},

			showModalSignup: (value) => {
				setStore({ showModalSignup: value });
			}
		}
	};
};

export default getState;
