const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			results: null,
			isLogin: false
		},
		actions: {
			APICall: async (url, options) => {
				try {
					const response = await fetch(url, options);
					if (!response.ok) {
						console.log('Error: ' + response.status, response.statusText);
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
				return await getActions().APICall(process.env.BACKEND_URL + '/api/signin/', options);
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
		}
	};
};

export default getState;
