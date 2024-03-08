const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			results: null,
			isLogin: false
		},
		actions: {
			APICall : async (url, options) => {
				try {
					const response = await fetch(url, options);
					if (!response.ok) {
						console.log('Error: ' + response.status, response.statusText);
						return response.status;
					}
					console.log(options.method, "was succesfully sent!")
					return await response.json();
				} catch (error) {
					console.error('Error in fetch:', error);
					return null;
				}
			},
			
			signin : async (data) => {
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
				} else console.error('Algo salio mal, no se el que, pero algo')
			},

			signup : async (data) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
				return await getActions().APICall(process.env.BACKEND_URL + '/api/signup/', options)
			},

			signedIn : () => {
				setStore({ isLogin: true });
			}
		}
	};
};

export default getState;
