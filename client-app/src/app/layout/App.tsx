import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from './../models/activity';
import NavBar from './../../features/nav/NavBar';
import agent from '../api/agent';
import ActivityDashboard from './../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';

const App = () => {
	//mobx
	const activityStore = useContext(ActivityStore);
	//Hooks
	const [ activities, setActivities ] = useState<IActivity[]>([]);
	const [ selectedActivity, setSelectedActivity ] = useState<IActivity | null>(null);
	const [ editMode, setEditMode ] = useState(false);
	const [ loading, setLoading ] = useState(true);
	const [ submitting, setSubmitting ] = useState(false);
	const [ target, setTarget ] = useState('');

	//In order to select individual activity

	useEffect(
		() => {
			activityStore.loadActivities();
		},
		[ activityStore ]
	);

	if (activityStore.loadingInitial) return <LoadingComponent content="Loading activities..." />;
	return (
		<Fragment>
			<NavBar />
			<Container style={{ marginTop: '7em' }}>
				<ActivityDashboard />
			</Container>
		</Fragment>
	);
};

export default observer(App);
