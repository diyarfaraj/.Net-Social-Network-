import React, { Component } from 'react';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';
import { IActivity } from './../models/activity';

interface Istate {
	activities: IActivity[];
}

class App extends Component<{}, IState> {
	readonly state: IState = {
		activities: []
	};

	componentDidMount() {
		axios.get<IActivity[]>('http://localhost:5000/api/activities/').then((response) => {
			this.setState({
				activities: response.data
			});
		});
	}

	render() {
		return (
			<div>
				<Header as="h2">
					<Icon name="users" />
					<Header.Content>Robotia</Header.Content>
				</Header>

				<List>
					{this.state.activities.map((activities) => (
						<List.Item key={activities.id}>{activities.title}</List.Item>
					))}
				</List>

				<ul />
			</div>
		);
	}
}

export default App;
