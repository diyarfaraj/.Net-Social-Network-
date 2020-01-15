import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';
import { IActivity } from './../models/activity';
import { NavBar } from './../../features/nav/NavBar';

const App = () => {
	//Hooks
	const [ activities, setActivities ] = useState<IActivity[]>([]);

	useEffect(() => {
		axios.get<IActivity[]>('http://localhost:5000/api/activities/').then((response) => {
			setActivities(response.data);
		});
	}, []);

	return (
		<div>
			<NavBar />

			<List>{activities.map((activities) => <List.Item key={activities.id}>{activities.title}</List.Item>)}</List>

			<ul />
		</div>
	);
};

export default App;
