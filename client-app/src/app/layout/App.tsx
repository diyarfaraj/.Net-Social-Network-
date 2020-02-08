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

const App: React.FC<RouteComponentProps> = ({ location }) => {
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
			<Route exact path="/" component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<Fragment>
						<NavBar />
						<Container style={{ marginTop: '7em' }}>
							<Route exact path="/activities" component={ActivityDashboard} />
							<Route
								key={location.key}
								path={[ '/createActivity', '/manage/:id' ]}
								component={ActivityForm}
							/>
							<Route path="/activities/:id" component={ActivityDetails} />
						</Container>
					</Fragment>
				)}
			/>
		</Fragment>
	);
};

export default withRouter(observer(App));
