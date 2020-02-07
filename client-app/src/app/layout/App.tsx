import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './../../features/nav/NavBar';
import ActivityDashboard from './../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';

const App = () => {
	//mobx
	const activityStore = useContext(ActivityStore);

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
				<Route exact path="/" component={HomePage} />
				<Route exact path="/activities" component={ActivityDashboard} />
				<Route path="/createActivity" component={ActivityForm} />
				<Route path="/activities:id" component={ActivityDetails} />
			</Container>
		</Fragment>
	);
};

export default observer(App);
