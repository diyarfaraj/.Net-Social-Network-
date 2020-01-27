import axios from 'axios';
import { IActivity } from './../models/activity';

axios.default.baseUrl = 'http://localhost:5000/api';

const reponseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => axios.get(url).then(responseBody),
	post: (url: string, body: {}) => axios.post(url, body).then(reponseBody),
	put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
	del: (url: string) => axios.delete(url).then(responseBody)
};

const Activities = {
	list: () => requests.get('/activities'),
	details: (id: string) => requests.get(`/activities/${id}`),
	create: (acitvity: IActivity) => requests.post('/activities', activity),
	update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
	delete: (id: string) => requests.del(`/requests/${id}`)
};

export default {
	Activities
};
