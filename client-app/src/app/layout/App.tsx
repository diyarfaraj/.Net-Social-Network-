import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { IActivity } from './../models/activity';
import { NavBar } from './../../features/nav/NavBar';
import { ActivityDashboard } from './../../features/activities/dashboard/ActivityDashboard';

const App = () => {
	//Hooks
	const [ activities, setActivities ] = useState<IActivity[]>([]);
	const [ selectedActivity, setSelectedActivity ] = useState<IActivity | null>(null);
	const [ editMode, setEditMode ] = useState(false);

	//In order to select individual activity
	const handleSelectActivity = (id: string) => {
		setSelectedActivity(activities.filter((a) => a.id === id)[0]);
	};

	const handleOpenCreateForm = () => {
		setSelectedActivity(null);
		setEditMode(true);
	};

	useEffect(() => {
		axios.get<IActivity[]>('http://localhost:5000/api/activities/').then((response) => {
			setActivities(response.data);
		});
	}, []);

	return (
		<Fragment>
			<NavBar openCreateForm={handleOpenCreateForm} />
			<Container style={{ marginTop: '7em' }}>
				<ActivityDashboard
					activities={activities}
					selectActivity={handleSelectActivity}
					selectedActivity={selectedActivity}
					editMode={editMode}
					setEditMode={setEditMode}
					setSelectedActivity={setSelectedActivity}
				/>
			</Container>
		</Fragment>
	);
};

export default App;